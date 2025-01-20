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

export default function Sort() {
  const router = useRouter()
  const pathname = usePathname()
  const seacrhParams = useSearchParams()
  const seacrhQuery = seacrhParams.get('query') || ''
  console.log(seacrhQuery)
  console.log(pathname)
  function handleSort(value: string) {
    const path = constructPath({sort:value, searchQuery:seacrhQuery, pathname })
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
