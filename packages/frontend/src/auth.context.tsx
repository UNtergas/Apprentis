'use client';

import { SignInResponse, User } from "@shared/frontend";
import { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "./api/ApiClient";
import Cookie from 'js-cookie';

interface AuthContextType {
    authInit: boolean;
    signIn: (email: string, password: string) => Promise<SignInResponse>;
    signOut: () => void;
    currentUser: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [authInit, setAuthInit] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const signIn = async (email: string, password: string):Promise<SignInResponse> => {
        try {
            const res = await ApiClient.Auth.signIn(email, password);
            await fetchCurrentUser();
            return res;
        }catch(e){
            throw e;
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const res = await ApiClient.User.getMe();
            setCurrentUser(res);
        }catch(e){
            throw e;
        }
    }

    const signOut = async ()=>{
        await ApiClient.Auth.signOut();
        setCurrentUser(null);
    }

    useEffect(() => {
        const initAuthContext = async () => {
            try {
                if(Cookie.get('token')){
                    await fetchCurrentUser();
                }
            } catch (e) {
                console.error("Failed to fetch user during initialization:", e);
                throw e;
            } finally {
                setAuthInit(true);
            }
        };

        initAuthContext();
    }, []);
    return(
        <AuthContext.Provider value={{currentUser, authInit, signIn, signOut}}>{children}</AuthContext.Provider>   
    )
}

export const useAuth = () =>{
    const auth = useContext(AuthContext);
    return auth
}