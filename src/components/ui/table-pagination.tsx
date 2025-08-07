import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Table } from "@tanstack/react-table";

type TablePaginationProps<TData> = {
  table: Table<TData>;
  pageSizes?: number[];
};

export function TablePagination<TData>({
  table,
  pageSizes = [10, 20, 30, 50, 100],
}: TablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getRowCount();

  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <Pagination className="justify-start">
      {/* Left Text: Showing X - Y from Z */}
      <PaginationContent className="text-muted-foreground">
        <PaginationItem>
          Showing {from} - {to} from {totalRows}
        </PaginationItem>
      </PaginationContent>

      {/* First Page Button */}
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
        </PaginationItem>
      </PaginationContent>

      {/* Previous / Next */}
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </PaginationItem>
      </PaginationContent>

      {/* Last Page */}
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </PaginationItem>
      </PaginationContent>

      {/* Page Size Selector */}
      <PaginationContent className="flex items-center gap-2">
        <PaginationItem>Rows per page:</PaginationItem>
        <PaginationItem>
          <Select
            defaultValue={pageSize.toString()}
            onValueChange={(value) => table.setPageSize(+value)}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
