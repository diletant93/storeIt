import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components_shadcn/ui/pagination"
import { parseQueryString } from "@/lib/utils";

export default async function PagePagination({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchQuery = ((await searchParams)?.query?.toString()) || ''
    const page = await parseQueryString(searchQuery).page || 1
    
    return (
        <Pagination className="hidden lg:flex">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" className="hover:bg-slate-200" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" className="text-brand">{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" className="hover:bg-slate-200" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    );
}
