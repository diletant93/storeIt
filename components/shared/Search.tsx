"use client";

import { Input } from "@/components_shadcn/ui/input";
import { getFiles } from "@/lib/actions/file.actions";
import { IFileType } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Thumbnail from "../elements/Thumbnail";
import FormattedDateTime from "../elements/FormattedDateTime";
import { getFileTypesParams, getFirstPathSegment, getProperType } from "@/lib/utils";
import { useDebounce } from "use-debounce";
export default function Search({params}:{params?:Promise<string|null>}) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [results, setResults] = useState<IFileType[] | null>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 270);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [isEntered, setIsEntered] = useState<boolean>(false)

  async function getSearchedFiles(){
    const pathNameType = getFirstPathSegment(pathname)
    const types = getFileTypesParams(pathNameType)
    const files = await getFiles({ searchText: debouncedQuery,  types});
    setResults(files);
    setIsOpen(true);
  }
  useEffect(() => {
    if (!isSearching) return;
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setIsOpen(false);
        if(isSearching) return router.push(pathname.replace(searchParams.toString(), ""));
      }
      if (debouncedQuery.length > 0 && !isEntered && isSearching) {
        console.log({isEntered,isSearching, length: debouncedQuery.length})
        await getSearchedFiles()
      }
    };
    fetchFiles();
  }, [debouncedQuery]); 
  useEffect(()=>{
    async function handlePressEnter(e:KeyboardEvent){
      if(e.key === 'Enter')
      {
        const pathNameType = getFirstPathSegment(pathname)
        setIsOpen(false)
        setIsEntered(true)
        router.push(`/${pathNameType}?query=${query}`)
      }
    }
    if(inputRef.current){
      inputRef.current.addEventListener('keydown',handlePressEnter)
    }
    return()=>{
      setIsEntered(false)
      if(inputRef.current){
        inputRef.current.removeEventListener('keydown',handlePressEnter)
      }
    }
  },[query])
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setIsSearching(true);
  }
  function handleClickItem(file: IFileType) {
    setIsSearching(false);
    setIsOpen(false); 
    setResults([]); 
    setQuery(file.name)
    const type = getProperType(file.type);
    router.push(`/${type}?query=${file.name}`); // Navigate to the specific document route
  }
  function handleOnBlurInput(){
    setIsFocused(false)
  }
  return (
    <div className="search">
      <div className="search-input-wrapper relative">
        {!isFocused && !query && (
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            onClick={() => {
              inputRef.current?.focus();
              setIsFocused(true);
            }}
            className="absolute top-1/2 left-5 -translate-y-1/2 cursor-text"
          />
        )}

        <Input
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlurInput}
          value={query}
          onChange={handleInputChange}
          className="focus:scale-105 transition-all duration-300 py-5 rounded-xl"
        />
      </div>

      {isOpen && (
        <ul className="search-result">
          {results && results.map((file) => (
            <li
              className="flex items-center justify-between hover:bg-slate-50 rounded-xl px-1 cursor-pointer"
              key={file.$id}
              onClick={() => handleClickItem(file)}
            >
              <div className="flex items-center gap-4">
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                  className="size-9 min-w-9"
                />
                <p className="subtitle-2 line-clamp-1 text-light-100 mb-1">
                  {file.name}
                </p>
              </div>
              <FormattedDateTime
                date={file.$createdAt}
                className="caption line-clamp-1 text-light-200"
              />
            </li>
          ))}
           {!results && (
          <li
          className="flex items-center justify-between hover:bg-slate-50 rounded-xl px-1">
            <div className="flex items-center gap-4">
              <p className="subtitle-2 line-clamp-1 text-light-100 mb-1">
                No files of this type were found
              </p>
            </div>
          </li>
        )}
        </ul>
      )}
    </div>
  );
}
