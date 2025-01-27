'use client';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export function ToasterProvider({children}: ToastProviderProps) {
    return(
        <>
            {children}
            <ToastContainer />
        </>
    )
}