import { Badge } from '@/components/ui/badge';
import { ProjectMasterType, ProjectStatus } from 'src/types/master';

interface ProjectCustomerCellProps {
  project: ProjectMasterType;
  setworkId?: (workId: number) => void;
  onClick?: () => void;
}

const statusColors: Record<ProjectStatus, string> = {
  NOT_STARTED: 'bg-gray-100 text-gray-700 border-gray-300',
  IN_PROCESS: 'bg-amber-50 text-amber-700 border-amber-300',
  COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-300',
  OVERDUE: 'bg-red-50 text-red-700 border-red-300',
};

const statusLabels: Record<ProjectStatus, string> = {
  NOT_STARTED: 'Not Started',
  IN_PROCESS: 'In Progress',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue',
};

export function ProjectCustomerCell({ project, setworkId, onClick }: ProjectCustomerCellProps) {
  return (
    <div className="py-2 space-y-3">
      <div>
        <div className="items-center w-9/12 p-3 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex">
            <span className=" font-semibold text-gray-600">Customer Name:</span>
            <h4
              className="font-bold text-green-900 text-sm pl-3 overflow-hidden text-ellipsis whitespace-nowrap"
              title={project?.customerName}
            >
              {project?.customerName}
            </h4>
          </div>

          <div className="flex">
            <span className=" font-semibold text-gray-600">Project Number:</span>
            <h4 className="font-bold text-blue-900 text-sm pl-4"> {project?.projectNo}</h4>
          </div>
        </div>
      </div>

      {/* Status and Days - Horizontal Layout */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* SW Dev Section */}

        <div
          onClick={() => {
            setworkId && setworkId(2);
            onClick && onClick();
          }}
          className="flex items-center justify-between w-9/12 p-3 bg-teal-50 border border-teal-200 rounded-xl shadow-sm cursor-pointer"
        >
          <div className="flex flex-col">
            <h4 className="font-semibold text-blue-900 text-sm">Software Development</h4>
            <div className="mt-1 text-xs text-blue-800 space-y-0.5">
              <p>
                <span className="font-medium text-blue-900">Total:</span>

                <span className="font-bold pl-1">{project?.swDevDays ?? 0}</span>
              </p>
              <p>
                <span className="font-medium text-blue-900">Remaining:</span>{' '}
                <span className="font-bold pl-1">{project?.swDevDaysRemaining ?? 0}</span>
              </p>
              <p>
                <span className="font-medium text-blue-900">Used:</span>{' '}
                <span className="font-bold pl-1">
                  {project?.swDevDays - project?.swDevDaysRemaining}
                </span>
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className={`text-[11px] font-medium px-2 py-0.5 h-5 rounded-md ${
              statusColors[(project.swDevStatus ?? 'NOT_STARTED') as ProjectStatus]
            }`}
          >
            {statusLabels[(project.swDevStatus ?? 'NOT_STARTED') as ProjectStatus]}
          </Badge>
        </div>

        {/* Commissioning Section */}
        <div
          onClick={() => {
            setworkId && setworkId(1);
            onClick && onClick();
          }}
          className="flex items-center justify-between w-9/12 p-3 bg-orange-100 border border-orange-200 rounded-xl shadow-sm cursor-pointer"
        >
          <div className="flex flex-col">
            <h4 className="font-semibold text-orange-900 text-sm">Commissioning</h4>
            <div className="mt-1 text-xs text-orange-800 space-y-0.5">
              <p>
                <span className="font-medium text-orange-900">Total:</span>
                <span className="font-bold pl-1">{project?.commissioningDays ?? 0}</span>
              </p>
              <p>
                <span className="font-medium text-orange-900">Remaining:</span>{' '}
                <span className="font-bold pl-1">{project?.commissioningDaysRemaining ?? 0}</span>
              </p>
              <p>
                <span className="font-medium text-orange-900">Used:</span>{' '}
                <span className="font-bold pl-1">
                  {project.commissioningDays - project.commissioningDaysRemaining || 0}
                </span>
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className={`text-[11px] font-medium px-2 py-0.5 h-5 rounded-md ${
              statusColors[(project?.commissioningStatus ?? 'NOT_STARTED') as ProjectStatus]
            }`}
          >
            {statusLabels[(project?.commissioningStatus ?? 'NOT_STARTED') as ProjectStatus]}
          </Badge>
        </div>
      </div>
    </div>
  );
}
