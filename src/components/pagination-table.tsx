import { type Product } from "@/services/apis/product";
import { useProducts } from "@/services/hooks/use-product";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import DebugTanstackTable from "./tanstack-table-devtool";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { TablePagination } from "./ui/table-pagination";

const columnHelper = createColumnHelper<Product>();

const fallbackData: Product[] = [];

const PaginationTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const { data } = useProducts({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID", // format header
        cell: (info) => {
          return info.getValue();
        }
      }),
      columnHelper.accessor("name", {
        header: "Title"
      }),
      columnHelper.accessor("price", {
        header: "Price"
      }),
      columnHelper.accessor("description", {
        header: "Description"
      })
    ],
    []
  );

  const paginationTable = useReactTable({
    data: data?.data || fallbackData,
    columns,
    state: {
      pagination
    },
    rowCount: data?.total,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div>
      <DebugTanstackTable table={paginationTable} />
      <Table>
        <TableHeader>
          {paginationTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {paginationTable.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination 
        table={paginationTable}
      />
    </div>
  );
};

export default PaginationTable;
