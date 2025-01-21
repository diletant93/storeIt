"use client"
import { Input } from "@/components_shadcn/ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

export default function UpgradedSearch() {
    const [query, setQuery] = useState<string>('')

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const input = inputRef.current

    const seacrhParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    function handleSearch(value: string){
        setQuery(value)
        const params = new URLSearchParams(seacrhParams)
        if(value){
            params.set('query',value)
        }else{
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }

  return (
    <div className="search">
      <div className="search-input-wrapper relative">
         {!isFocused && !query && ( <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className="absolute top-1/2 left-5 -translate-y-1/2 cursor-text"
            onClick={()=>{
                setIsFocused(true)
                if(input) input.focus()
            }}
          />)}

        <Input
          ref={inputRef}
          onBlur={()=>{setIsFocused(false)}}
          onFocus={()=>{setIsFocused(true)}}
          value={query}
          onChange={(e:ChangeEvent<HTMLInputElement>) => {handleSearch(e.target.value)}}
          className="focus:scale-105 transition-all duration-300 py-5 pl-3 rounded-xl"
        />
      </div>
    </div>
  );
}
