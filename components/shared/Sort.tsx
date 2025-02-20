"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components_shadcn/ui/select"
import { sortTypes } from "@/constants";
import { constructPath } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Sort({searchParams} :{searchParams?:Promise<{[key:string]:string| string[]|undefined}>}) {
  const router = useRouter()
  const pathname = usePathname()
  const seacrhParams = useSearchParams()
  const searchQuery = seacrhParams.toString()
  function handleSort(value: string) {
    const path = constructPath({paramName:'sort', paramValue:value ,searchQuery, pathname })
    router.push(path)
  }
  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger className="sort-select">
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent className="sort-select-content">
        {sortTypes.map(sortOption=>(
          <SelectItem key={sortOption.label} className="shad-select-item" value={sortOption.value}>{sortOption.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>

  );
}
