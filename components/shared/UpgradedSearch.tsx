"use client"
import { Input } from "@/components_shadcn/ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

export default function UpgradedSearch() {
    const [query, setQuery] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false)
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
         {!isFocused && ( <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className="absolute top-1/2 left-5 -translate-y-1/2 cursor-text"
            onClick={()=>{setIsFocused(true)}}
          />)}

        <Input
          onBlur={()=>{setIsFocused(false)}}
          onFocus={()=>{setIsFocused(true)}}
          value={query}
          onChange={(e:ChangeEvent<HTMLInputElement>) => {handleSearch(e.target.value)}}
          defaultValue={seacrhParams.get('query')?.toString()}
          className="focus:scale-105 transition-all duration-300 py-5 pl-8 rounded-xl"
        />
      </div>
    </div>
  );
}
