import type { Product } from "@/services/apis/product";
import { useProducts } from "@/services/hooks/use-product";
import {
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

const columnsHelper = createColumnHelper<Product>();

const columns = [
  columnsHelper.accessor("id", {
    header: "ID",
    enableSorting: true,
    sortDescFirst: true,
    size: 800,
    minSize: 100,
    maxSize: 800,
    enableResizing: true
  }),
  columnsHelper.accessor("title", {
    header: "Product Title",
    cell: (c) => c.renderValue(), //
    enableSorting: true
  })
];

export default function BasicTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  /**
   * sorting depend on pagination client-side or server-side
   * but in case server-side pagination and client-side sorting will only filter only data loaded
   * not entire dataset
   */
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // convert page to offset
  // page = 1, offset = 0
  // page = 2, offset = 10
  // page (2 - 1) * 10
  const sortingParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("offset", pagination.pageIndex.toString());
    params.set("limit", pagination.pageSize.toString());

    if (sorting.length > 0) {
      for (const sort of sorting) {
        params.set(sort.id, sort.desc ? "desc" : "asc");
      }
    }

    return params.toString();
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  // console.log("🚀 ~ BasicTable ~ sortingParams:", sortingParams);

  const { data } = useProducts({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize
  });

  const { data: data2 } = useProducts({});
  const memoData = useMemo<Product[]>(() => data || [], [data]);

  const table = useReactTable({
    data: memoData,
    columns,
    state: {
      pagination,
      sorting,
      columnFilters
    },
    manualPagination: true,
    // getRowId: (rawRecord) => rawRecord.id.toString(), // change get row id default is index(zero base)
    /**
     * When manualSorting is set to true, the table will assume that the data that
     * you provide is already sorted, and will not apply any sorting to it.
     */
    // manualSorting: true,
    rowCount: data2?.length || 0,
    enableMultiSort: true,
    columnResizeMode: "onChange",
    // getPaginationRowModel: getPaginationRowModel(), // dont need for server-side
    getSortedRowModel: getSortedRowModel(), // dont need for server-side
    getCoreRowModel: getCoreRowModel(),

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // autoResetPageIndex: true // reset pageIndex when data is updated
    debugTable: true,
    debugHeaders: true 
  });

  // console.log("🚀 ~ BasicTable ~ memoData:", memoData);
  // console.log("🚀 ~ BasicTable ~ table 1:", table.getFlatHeaders());
  // console.log("🚀 ~ BasicTable ~ table 2:", table.getHeaderGroups());
  // console.log("🚀 ~ BasicTable ~ table 3:", table.getAllColumns());
  // console.log("🚀 ~ BasicTable ~ table 4:", table.getRowModel());
  // console.log("🚀 ~ BasicTable ~ table 5:", table.getCoreRowModel());
  // console.log("🚀 ~ BasicTable ~ table 6:", table.getCanNextPage());
  // console.log("🚀 ~ BasicTable ~ table 7:", table.getColumn("id"));
  // console.log("🚀 ~ BasicTable ~ table 7:", table.getRow("190"));

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const currentFiltered = table.getState().columnFilters;
  const currentSorting = table.getState().sorting;

  return (
    <div>
      <div>
        <h1>Debug data</h1>
        <pre>
          pagination:
          {JSON.stringify(pagination, null, 2)}
        </pre>
        <pre>
          sorting:
          {JSON.stringify(sorting, null, 2)}
        </pre>
      </div>
      <div>
        <button onClick={() => table.resetSorting()}>Clear sorting</button>
      </div>
      <table>
        <thead>
          {/* header */}
          {table.getHeaderGroups().map(({ id, headers }) => (
            <tr key={id}>
              {headers.map((header) => (
                <th
                  className="relative"
                  key={header.id}
                  colSpan={header.colSpan}
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === "asc"
                        ? "Sort ascending"
                        : header.column.getNextSortingOrder() === "desc"
                        ? "Sort descending"
                        : "Clear sort"
                      : undefined
                  }
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    width: header.column.getSize()
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanResize() && (
                    <div
                      className="w-1 h-4 bg-red-500 absolute right-0 top-0 hover:cursor-ew-resize"
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div>
        <button
          onClick={() => {
            table.firstPage();
          }}
        >
          First Page
        </button>
        <button
          onClick={() => {
            table.lastPage();
          }}
        >
          Last Page
        </button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {"<"}
        </button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {">"}
        </button>
        <p>total: {table.getPageCount()}</p>
        <p>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
      </div>

      {/* pagination normal */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => table.setPageIndex(i)}
            className={`px-3 py-1 border rounded ${
              pageIndex === i ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Pagination 3 */}
      <Pagination table={table} />
    </div>
  );
}

function getPaginationRange(
  current: number,
  total: number,
  siblingCount: number = 1
): (number | "dots")[] {
  const DOTS = "dots";
  const totalPageNumbers = siblingCount * 2 + 5;

  if (total <= totalPageNumbers) {
    return [...Array(total)].map((_, i) => i);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total - 2);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < total - 3;

  const firstPage = 0;
  const lastPage = total - 1;

  const range: (number | "dots")[] = [];

  range.push(firstPage);

  if (showLeftDots) {
    range.push(DOTS);
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i);
  }

  if (showRightDots) {
    range.push(DOTS);
  }

  range.push(lastPage);

  return range;
}

function Pagination({ table }: { table: any }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const range = getPaginationRange(pageIndex, pageCount);
  // console.log("🚀 ~ Pagination ~ range:", range);

  return (
    <div className="flex items-center gap-2 mt-4 flex-wrap">
      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        First
      </button>

      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {range.map((item, idx) => {
        if (item === "dots") {
          return (
            <span key={`dots-${idx}`} className="px-2 py-1">
              ...
            </span>
          );
        }

        return (
          <button
            key={`page-${item}`}
            onClick={() => table.setPageIndex(item)}
            className={`px-3 py-1 border rounded ${item === pageIndex ? "bg-blue-600 text-white" : ""}`}
          >
            {item + 1}
          </button>
        );
      })}
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>

      <button
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
}

function HeaderCol(props: any) {
  return <div>{JSON.stringify(props)}</div>;
}
