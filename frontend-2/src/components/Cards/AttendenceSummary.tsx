import { cn } from '@/lib/utils';
import { EmployeeAttendanceType } from 'src/types/Analytics';

export function AttendenceSummary({
  className,
  data,
}: {
  className?: string;
  data: EmployeeAttendanceType;
}) {
  const fmt = (v: number | null) => (v !== null ? v : '–');

  return (
    <div className={cn('w-full overflow-x-auto ', className)}>
      <table className="w-full border-collapse text-sm md:text-base">
        <caption className="sr-only">Grand Totals and Averages</caption>
        <thead>
          <tr className="bg-muted">
            <th className="text-left font-medium p-3 border border-border">Metric</th>
            <th className="text-right font-medium p-3 border border-border">Days at site</th>
            {/* <th className="text-right font-medium p-3 border border-border">Site Days in %</th> */}
            <th className="text-right font-medium p-3 border border-border">Days at office</th>
            {/* <th className="text-right font-medium p-3 border border-border">Office Days in %</th> */}
            <th className="text-right font-medium p-3 border border-border">Holidays & Leave</th>
            {/* <th className="text-right font-medium p-3 border border-border">
              Holidays & Leave in %
            </th> */}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-pink-100 dark:bg-pink-950/30">
            <th scope="row" className="text-left font-semibold p-3 border border-border">
              Grand Total
            </th>
            <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.grandTotal?.siteDays)}
            </td>
            {/* <td className="text-right p-3 border border-border font-medium">
              {data?.grandTotal?.sitePercentage == 0 ? '–' : fmt(data?.grandTotal?.sitePercentage)}
            </td> */}
            <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.grandTotal?.officeDays)}
            </td>
            {/* <td className="text-right p-3 border border-border font-medium">
              {data?.grandTotal?.officePercentage == 0
                ? '–'
                : fmt(data?.grandTotal?.officePercentage)}
            </td> */}
            <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.grandTotal?.holidayAndLeaveDays)}
            </td>
            {/* <td className="text-right p-3 border border-border font-medium">
              {data?.grandTotal?.holidayAndLeavePercentage == 0
                ? '–'
                : fmt(data?.grandTotal?.holidayAndLeavePercentage)}
            </td> */}
          </tr>

          <tr className="bg-cyan-100 dark:bg-cyan-950/30">
            <th scope="row" className="text-left font-semibold p-3 border border-border">
              Average / Head
            </th>
            <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.averagePerHead?.siteDays)}
            </td>
            {/* <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.averagePerHead?.sitePercentage)}
            </td> */}
            <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.averagePerHead?.officeDays)}
            </td>
            {/* <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.averagePerHead?.officePercentage)}
            </td> */}
            <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.averagePerHead?.holidayAndLeaveDays)}
            </td>
            {/* <td className="text-right p-3 border border-border font-medium">
              {fmt(data?.averagePerHead?.holidayAndLeavePercentage)}
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
