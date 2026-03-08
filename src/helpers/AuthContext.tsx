"use client"

import { Session } from "@/servers/models/session.model";
import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

type AuthContextType = {
    authSession: Session | null;
    setAuthSession: Dispatch<SetStateAction<Session | null>>;
}

export const authContext = createContext<AuthContextType | null>(null);

export function AuthContext({ children }: { children: ReactNode }) {
    const [authSession, setAuthSession] = useState<Session | null>(null);

    return (
        <authContext.Provider value={{authSession, setAuthSession}}>
            {children}
        </authContext.Provider>
    )
}