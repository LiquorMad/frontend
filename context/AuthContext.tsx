import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'; 
import { recoverUSerInformation, sigInRequest } from "@/lib/auth";
import { Router, useRouter } from "next/router";

type User = {
    email: string,
    password: string
}

type SigIngData = {
    email: string
    password: string
}

type AuthContextType = {
    isAuthenticated: boolean
    user: User
    signIn: (data:SigIngData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }:any){

  const router = useRouter();

    const [user, setUser] = useState<User | any>(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'ps4StandingsAuth.token': token } = parseCookies()
        if(token){
            recoverUSerInformation(token).then(response => {
                setUser(response.user)
            })
        }
    },[])
    
    async function signIn({email,password}:SigIngData){
        const {token, user}:any = await sigInRequest({email, password});
        setCookie(undefined, 'ps4StandingsAuth.token', token.token, {
            maxAge: 60 * 60 * 1, // 1 hour
          })
        setUser(user)
        router.push('home');
    }
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated,signIn }}>
            {children}
        </AuthContext.Provider>
    )
}