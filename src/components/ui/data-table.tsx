import { getCoreRowModel, useReactTable, type ColumnDef, type RowData } from "@tanstack/react-table";
import { Table } from "./table";

export type DataTypeProps<TData extends RowData, TValue = unknown> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
};

export function DataTable<TData extends RowData, TValue = unknown>({
  data,
  columns
}: DataTypeProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Table>

    </Table>
  )
}
