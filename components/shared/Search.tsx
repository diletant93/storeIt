"use client"
import { Input } from "@/components_shadcn/ui/input";
import { getFiles } from "@/lib/actions/file.actions";
import { IFileType } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Thumbnail from "../elements/Thumbnail";
import FormattedDateTime from "../elements/FormattedDateTime";
import { getProperType } from "@/lib/utils";
import { useDebounce } from 'use-debounce';
export default function Search() {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') || ''

  const [query, setQuery] = useState<string>('')
  const [debouncedQuery] = useDebounce(query, 300)

  const [results, setResults] = useState<IFileType[] | null>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setQuery('')
        setIsOpen(false)
        return router.push(pathname.replace(searchParams.toString(), ''))
      }
      const files = await getFiles({ searchText: debouncedQuery })
      setResults(files)
      setIsOpen(true)
    }
    fetchFiles()
  }, [debouncedQuery])
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {

      }
    }
    if (inputRef.current) {
      inputRef.current.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [query])

  useEffect(() => {
    if (!searchQuery) {
      setQuery('')
      setIsOpen(false)
    }
  }, [searchQuery])
  function handleRawFind() {

  }
  function handleResetSearchBar(){
    setIsFocused(false)
    setResults([])
    setQuery('')
  }
  function handleClickItem(file: IFileType) {
    setIsOpen(false)
    setResults([])
    const type = getProperType(file.type)
    router.push(`/${type}?query=${debouncedQuery}`)
  }
  return (
    <div className="search">
      <div className="seacrh-input-wrapper">
        {!isFocused && (<Image
          src='/assets/icons/search.svg'
          alt="search"
          width={24} height={24}
          onClick={() => { inputRef.current?.focus(); setIsFocused(true) }}
          className="absolute top-1/2 left-1 -translate-y-1/2 cursor-text" />)}

        <Input ref={inputRef}
          onFocus={() => { setIsFocused(true) }}
          onBlur={handleResetSearchBar}
          value={query}
          onChange={(e) => { setQuery(e.target.value) }}
          className={`${!isFocused && ''}`} />

      </div>
      {isOpen && (
        <ul className="search-result">
          {results ? (
            results.map((file) => (
              <li className="flex items-center justify-between" key={file.$id} onClick={() => { handleClickItem(file) }}>
                <div className="flex cursor-pointer items-center gap-4">
                  <Thumbnail type={file.type} extension={file.extension} url={file.url} className="size-9 min-w-9" />
                  <p className="subtitle-2 line-clamp-1 text-light-100 mb-1">
                    {file.name}
                  </p>
                </div>
                <FormattedDateTime date={file.$createdAt} className="caption line-clamp-1 text-light-200" />
              </li>
            ))
          ) : (
            <p className="empty-result">No files</p>
          )}
        </ul>
      )}
    </div>
  );
}
