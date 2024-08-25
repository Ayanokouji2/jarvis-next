'use client'

import { useEffect } from "react";
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("65d35521-db26-4afa-bb74-2d21ad1175b6")
    },[])

    return null;
}