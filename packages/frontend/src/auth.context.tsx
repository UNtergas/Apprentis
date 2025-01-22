// 'use client';

// import { SignInResponse, UserDTO } from "@shared/frontend";
// import { createContext, useContext, useEffect, useState } from "react";
// import ApiClient from "./api/ApiClient";

// const TOKEN_STORAGE= 'jwt_token';


// interface AuthContextType {
//     token : string | null;
//     tokenInit: boolean;
//     signIn: (email: string, password: string) => Promise<SignInResponse>;
//     signOut: () => void;
//     currentUser: UserDTO | null;
// }

// const AuthContext = createContext<AuthContextType | null>(null)

// export const AuthProvider = ({children} : {children: React.ReactNode}) => {
//     const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE));
//     const [tokenInit, setTokenInit] = useState<boolean>(false);
//     const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);

//     const signIn = async (email: string, password: string):Promise<SignInResponse> => {
//         try {
//             const res = await ApiClient.Auth.signIn(email, password);
//             localStorage.setItem(TOKEN_STORAGE, res.token);
//             setToken(res.token);
//             await fetchCurrentUser(res.token);
//             return res;
//         }catch(e){
//             throw e;
//         }
//     }

//     const fetchCurrentUser = async (token:string) => {
//         try {
//             const res = await ApiClient.User.getMe(token);
//             setCurrentUser(res);
//         }catch(e){
//             throw e;
//         }
//     }

//     const signOut = ()=>{
//         localStorage.removeItem(TOKEN_STORAGE);
//         setToken(null);
//         setCurrentUser(null);
//     }

//     useEffect(()=>{
//         const initAuthContext = async () => {
//             if(token){
//                 localStorage.setItem(TOKEN_STORAGE, token); 
//                 await fetchCurrentUser(token);
//             }
//             setTokenInit(true);
//         }
//         initAuthContext();
//     },[token])
//     return(
//         <AuthContext.Provider value={{token, currentUser, tokenInit, signIn, signOut}}>{children}</AuthContext.Provider>   
//     )
// }

// export const useAuth = () =>{
//     const auth = useContext(AuthContext);
//     return auth
// }