"use client"
import { Input } from "@/components_shadcn/ui/input";
import { getFiles } from "@/lib/actions/file.actions";
import { IFileType } from "@/types/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Thumbnail from "../elements/Thumbnail";
import FormattedDateTime from "../elements/FormattedDateTime";
import { getProperType } from "@/lib/utils";

export default function Search() {
  const [query, setQuery] = useState<string>('')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') || ''
  const router = useRouter()
  const [results, setResults] = useState<IFileType[] | null>([])
  const [isOpen , setIsOpen] = useState<boolean>(false)
  useEffect( ()=>{
    const fetchFiles = async()=>{
      const files = await getFiles({searchText:query})
      setResults(files)
      setIsOpen(true)
    }
    fetchFiles()
  },[query])
  useEffect(()=>{
    if(!searchQuery){
      setQuery('')
    }
  },[searchQuery])
  function handleClickItem(file:IFileType){
    setIsOpen(false)
    setResults([])
    const type = getProperType(file.type)
    router.push(`/${type}?query=${query}`)
  }
  return (
    <div className="search">
       <div className="seacrh-input-wrapper">
        <Image src='/assets/icons/search.svg' alt="search" width={24} height={24}/>
        <Input value={query} onChange={(e) => {setQuery(e.target.value)}}/>
       </div>
       {isOpen &&(
        <ul className="search-result">
          {results ? (
            results.map((file)=>(
              <li className="flex items-center justify-between" key={file.$id} onClick={()=>{handleClickItem(file)}}>
                <div className="flex cursor-pointer items-center gap-4">
                  <Thumbnail type={file.type} extension={file.extension} url={file.url} className="size-9 min-w-9"/>
                  <p className="subtitle-2 line-clamp-1 text-light-100 mb-1">
                  {file.name}
                  </p>
                </div>
                <FormattedDateTime date={file.$createdAt} className="caption line-clamp-1 text-light-200"/>
              </li>
            ))
          ):(
            <p className="empty-result">No files</p>
          )}
        </ul>
       )}
    </div>
  );
}
