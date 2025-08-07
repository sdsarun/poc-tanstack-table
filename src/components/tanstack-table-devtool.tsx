"use client";

import { type Table } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bug, Check } from "lucide-react";

type StateKey =
  | "columnFilters"
  | "globalFilter"
  | "sorting"
  | "pagination"
  | "columnVisibility"
  | "columnOrder"
  | "rowSelection"
  | "expanded"
  | "grouping"
  | "columnPinning"
  | "columnSizing"
  | "columnSizingInfo"
  | "rowPinning";

const stateOptions: readonly StateKey[] = [
  "columnFilters",
  "globalFilter",
  "sorting",
  "pagination",
  "columnVisibility",
  "columnOrder",
  "rowSelection",
  "expanded",
  "grouping",
  "columnPinning",
  "columnSizing",
  "columnSizingInfo",
  "rowPinning"
];

type ModelKey = keyof Table<any>;

const modelOptions: readonly ModelKey[] = [
  "getAllColumns",
  "getHeaderGroups",
  "getRowModel",
  "getGroupedRowModel",
  "getPaginationRowModel",
  "getCoreRowModel",
  "getFilteredRowModel",
  "getFilteredSelectedRowModel"
];

type MultiSelectProps<T extends string> = {
  label: string;
  options: readonly T[];
  selected: T[];
  onChange: (values: T[]) => void;
};
function MultiSelect<T extends string>({ label, options, selected, onChange }: MultiSelectProps<T>) {
  const toggleOption = (option: T) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="mb-4">
      <Label className="mb-1 block text-sm font-medium">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full truncate text-left whitespace-nowrap overflow-hidden"
          >
            {selected.length === 0 ? `Select ${label.toLowerCase()}...` : selected.join(", ")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-2">
          <ScrollArea className="h-96">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted rounded"
                onClick={() => toggleOption(option)}
                title={option}
              >
                <div className="flex items-center gap-1 flex-1">
                  <Checkbox checked={selected.includes(option)} />
                  <span className="max-w-[180px] block truncate whitespace-nowrap overflow-hidden">{option}</span>
                </div>
                {selected.includes(option) && <Check className="w-4 h-4 text-green-600" />}
              </div>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}

type DebugTanstackTableProps<T> = {
  table: Table<T>;
};

export default function DebugTanstackTable<T>({ table }: DebugTanstackTableProps<T>) {
  const [open, setOpen] = useState(false);

  // Selected keys to show for table state
  const [visibleStates, setVisibleStates] = useState<StateKey[]>([
    "sorting",
    "pagination",
    "columnFilters"
  ]);

  // Selected models to show logs from
  const [visibleModels, setVisibleModels] = useState<ModelKey[]>(["getHeaderGroups", "getRowModel"]);

  // Get current table state
  const tableState = table.getState();

  // Render JSON of a table state key
  const renderStateValue = (key: StateKey) => {
    const value = tableState[key];
    if (value == null) return null;
    return (
      <div key={key} className="mt-4">
        <Label className="font-bold capitalize">{key}</Label>
        <pre className="bg-muted p-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    );
  };

  // Render JSON of a model key
  const renderModelValue = (key: ModelKey) => {
    let value: unknown;
    try {
      value = (table as any)[key](); // some models are functions
    } catch {
      value = undefined;
    }
    if (value == null) return null;
    // Safely stringify without circular refs:
    let jsonString = "";
    try {
      jsonString = JSON.stringify(value, getCircularReplacer(), 2);
    } catch {
      jsonString = "[Cannot stringify]";
    }

    return (
      <div key={key} className="mt-4">
        <Label className="font-bold capitalize">{key}</Label>
        <pre className="bg-muted p-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
          {jsonString}
        </pre>
      </div>
    );
  };

  // Helper to handle circular references in JSON.stringify
  function getCircularReplacer() {
    const seen = new WeakSet();
    return (_key: string, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    };
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="relative">
      {/* Floating debug open button */}
      <Button
        variant="outline"
        className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open debug panel"
      >
        <Bug className="w-5 h-5" />
      </Button>

      {/* Sidebar debug panel */}
      {open && (
        <aside className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-lg border-l border-gray-200 z-50 flex flex-col">
          <header className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Debug Table State & Models</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              aria-label="Close debug panel"
            >
              ✕
            </Button>
          </header>
          <main className="overflow-auto p-4 flex-grow">
            <Card>
              <CardContent>
                <MultiSelect
                  label="Show Table State"
                  options={stateOptions}
                  selected={visibleStates}
                  onChange={setVisibleStates}
                />
                <MultiSelect
                  label="Show Table Models"
                  options={modelOptions}
                  selected={visibleModels}
                  onChange={setVisibleModels}
                />
                <hr className="my-4" />

                {/* Render selected states */}
                {visibleStates.map(renderStateValue)}

                {/* Render selected models */}
                {visibleModels.map(renderModelValue)}
              </CardContent>
            </Card>
          </main>
        </aside>
      )}
    </div>
  );
}
