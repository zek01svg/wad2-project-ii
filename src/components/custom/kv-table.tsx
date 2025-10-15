import { Check, Copy } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "#client/components/custom/table";
import { useCopyToClipboard } from "#client/hooks/use-copy-to-clipboard";

interface KVTableProps {
  data: Record<string, string | number | boolean>;
}
export function KVTable({ data }: KVTableProps) {
  return (
    <div className="mx-auto max-w-lg">
      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <Table>
          <TableBody>
            {Object.entries(data).map(([key, value]) => {
              return <RowAction key={key} label={key} value={value} />;
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RowAction({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean;
}) {
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <TableRow
      className="group *:border-border text-left hover:bg-transparent [&>:not(:last-child)]:border-r"
      onClick={(e) => {
        e.stopPropagation();
        copy(value.toString());
      }}
    >
      <TableCell className="bg-muted/50 py-1 font-mono font-medium">
        {label}
      </TableCell>
      <TableCell className="relative py-1 font-mono">
        {value}
        <div className="border-border bg-background invisible absolute top-1.5 right-1.5 rounded-sm border p-0.5 backdrop-blur-sm group-hover:visible">
          {!isCopied ? (
            <Copy className="h-3 w-3" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
