import { cn } from '@/lib/utils';

type Mode = 'sum' | 'avg' | 'sum-and-avg';

export type ColumnDef = {
  key: string;
  label: string;
  mode: Mode;
  decimals?: number;
};

type Row = {
  name: string;
  daysAtSite: number;
  sitePct: number;
  daysAtOffice: number;
  officePct: number;
  holidays: number;
  holidaysPct: number;
};

const columns: ColumnDef[] = [
  { key: 'daysAtSite', label: 'Days at Site', mode: 'sum-and-avg', decimals: 0 },
  { key: 'sitePct', label: 'Site Days in %', mode: 'avg', decimals: 2 },
  { key: 'daysAtOffice', label: 'Days at Office', mode: 'sum-and-avg', decimals: 0 },
  { key: 'officePct', label: 'Office Days in %', mode: 'avg', decimals: 2 },
  { key: 'holidays', label: 'Holidays & Leave', mode: 'sum-and-avg', decimals: 0 },
  { key: 'holidaysPct', label: 'Holidays & Leave in %', mode: 'avg', decimals: 2 },
];

export function AttendenceSummaryTable<T extends Record<string, unknown>>({
  title = 'Grand Totals and Averages',
  className,
}: {
  title?: string;
  className?: string;
}) {
  //   const count = rows.length;
  //   const safeCount = count === 0 ? 1 : count;

  //   const sums: Record<string, number> = {};
  //   const avgs: Record<string, number> = {};

  //   for (const col of columns) {
  //     const values = rows.map((r) => {
  //       const v = Number((r as any)[col.key]);
  //       return Number.isFinite(v) ? v : 0;
  //     });
  //     const sum = values.reduce((a, b) => a + b, 0);
  //     if (col.mode !== 'avg') sums[col.key] = sum;
  //     if (col.mode !== 'sum') avgs[col.key] = sum / safeCount;
  //   }

  //   const fmt = (v: number | undefined, d = 0) =>
  //     typeof v === 'number' && Number.isFinite(v) ? v.toFixed(d) : '–';

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse text-sm md:text-base">
        <caption className="sr-only">{title}</caption>
        <thead className="bg-white">
          <tr className="bg-muted">
            <th className="text-left font-medium p-3 border border-border">Metric</th>
            {columns.map((c) => (
              <th key={c.key} className="text-right font-medium p-3 border border-border">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          <tr className="bg-accent/60">
            <th scope="row" className="text-left font-semibold p-3 border border-border">
              GRAND TOTAL
            </th>
            <td className="text-right p-3 border border-border">1102</td>
            <td className="text-right p-3 border border-border">1103</td>
            <td className="text-right p-3 border border-border">1104</td>
            <td className="text-right p-3 border border-border">1105</td>
            <td className="text-right p-3 border border-border">1106</td>
            <td className="text-right p-3 border border-border">110</td>
          </tr>
          <tr className="bg-secondary/60">
            <th scope="row" className="text-left font-semibold p-3 border border-border">
              AVERAGE / HEAD
            </th>
            <td className="text-right p-3 border border-border">101</td>
            <td className="text-right p-3 border border-border">102</td>
            <td className="text-right p-3 border border-border">103</td>
            <td className="text-right p-3 border border-border">104</td>
            <td className="text-right p-3 border border-border">105</td>
            <td className="text-right p-3 border border-border">106</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-2 text-xs text-muted-foreground">
        Note: The above data is auto-calculated based on all approved schedules for the month.
        Please verify the employee attendance summary at the end of the month.
      </p>
    </div>
  );
}
