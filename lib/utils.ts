import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function handleError(error : unknown, message : string){
    console.log(message)
    throw error
}
export function parseStringify(value: unknown){
  return JSON.parse(JSON.stringify(value) )
}