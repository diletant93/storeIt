"use client"
import { ModalType, OpenModalType, WindowModalType } from "@/types/types";
import { cloneElement, createContext, useContext, useState } from "react";
import {HiXMark} from 'react-icons/hi2'
const INITIAL_STATE = {
    openName: '',
    setOpenName: () => { },
    close: () => { },
}

const ModalContext = createContext<ModalType>(INITIAL_STATE)

export function Modal({children}:{children:React.ReactNode}) {
    const [openName, setOpenName] = useState<string>('')
    const close = () => setOpenName('')
    const value = {
        openName,
        setOpenName,
        close,
    }
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

function useModal(){
    const context = useContext(ModalContext);
    if(context === undefined) throw new Error('CitiesContext was used outside of CitiesProvider');
    return context;
}

export function Open({openName, children}:OpenModalType){
    const {setOpenName} = useModal()
    return cloneElement(children, {onClick:()=>{setOpenName(openName)}})
}
export function Window({name, children}: WindowModalType){
    const {openName,close} = useModal()
    if(openName !== name) return null
    return(
        <div className="overlay">
            <div className="window">
                <button onClick={close} className="absolute top-2 right-2">
                    <HiXMark/>
                </button>
                {children}
            </div>
        </div>
    )
}