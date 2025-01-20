"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components_shadcn/ui/select"
import { sortTypes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export default function Sort() {
  const router = useRouter()
  const pathname = usePathname()
  function handleSort(value: string) {
    router.push(`${pathname}?sort=${value}`)
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
