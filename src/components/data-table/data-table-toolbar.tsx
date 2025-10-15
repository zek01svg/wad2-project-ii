"use client";

import { useMemo } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Kbd } from "#client/components/custom/kbd";
import { useDataTable } from "#client/components/data-table/data-table-provider";
import { Button } from "#client/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#client/components/ui/tooltip";
import { useHotKey } from "#client/hooks/use-hot-key";
import { formatCompactNumber } from "#client/lib/format";
import { useControls } from "#client/providers/controls";
import { DataTableFilterControlsDrawer } from "./data-table-filter-controls-drawer";
import { DataTableResetButton } from "./data-table-reset-button";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps {
  renderActions?: () => React.ReactNode;
}

export function DataTableToolbar({ renderActions }: DataTableToolbarProps) {
  const { table, isLoading, columnFilters } = useDataTable();
  const { open, setOpen } = useControls();
  useHotKey(() => setOpen((prev) => !prev), "b");
  const filters = table.getState().columnFilters;

  const rows = useMemo(
    () => ({
      total: table.getCoreRowModel().rows.length,
      filtered: table.getFilteredRowModel().rows.length,
    }),
    [isLoading, columnFilters],
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOpen((prev) => !prev)}
                className="hidden gap-2 sm:flex"
              >
                {open ? (
                  <>
                    <PanelLeftClose className="h-4 w-4" />
                    <span className="hidden md:block">Hide Controls</span>
                  </>
                ) : (
                  <>
                    <PanelLeftOpen className="h-4 w-4" />
                    <span className="hidden md:block">Show Controls</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>
                Toggle controls with{" "}
                <Kbd className="text-muted-foreground group-hover:text-accent-foreground ml-1">
                  <span className="mr-1">⌘</span>
                  <span>B</span>
                </Kbd>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="block sm:hidden">
          <DataTableFilterControlsDrawer />
        </div>
        <div>
          <p className="text-muted-foreground hidden text-sm sm:block">
            <span className="font-mono font-medium">
              {formatCompactNumber(rows.filtered)}
            </span>{" "}
            of{" "}
            <span className="font-mono font-medium">
              {formatCompactNumber(rows.total)}
            </span>{" "}
            row(s) <span className="sr-only sm:not-sr-only">filtered</span>
          </p>
          <p className="text-muted-foreground block text-sm sm:hidden">
            <span className="font-mono font-medium">
              {formatCompactNumber(rows.filtered)}
            </span>{" "}
            row(s)
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {filters.length ? <DataTableResetButton /> : null}
        {renderActions?.()}
        <DataTableViewOptions />
      </div>
    </div>
  );
}
