import { useProducts } from "@/services/hooks/use-product";
import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable
} from "@tanstack/react-table";
import { type Product } from "@/services/apis/product";
import { Button } from "./ui/button";

const columnHelper = createColumnHelper<Product>();

const fallbackData: Product[] = [];

const PaginationTable = () => {
  const { data } = useProducts();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID"
      }),
      columnHelper.accessor("title", {
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
    data: data || fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  
  return (
    <div>
      <Table>
        <TableHeader></TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
};

export default PaginationTable;
