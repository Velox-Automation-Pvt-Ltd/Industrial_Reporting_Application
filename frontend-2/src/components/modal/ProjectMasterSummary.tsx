import { Modal } from 'antd';
import ProjectDaysPieChart from '../Analytics/ProjectDaysPieChart';
import { ProjectMasterType } from 'src/types/master';
import { DataColumn } from 'src/types';
import { DataTable } from '../tables/DataTable';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getScheduleByProject,
  getScheduleByProjectSummary,
} from 'src/actions/schedule/ScheduleAction';
import { Schedule } from 'src/types/data';
import { formatDate } from 'src/utils/dateFormatter';
import getRowColors from 'src/utils/getRowColors';
import toast from 'react-hot-toast';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  data?: ProjectMasterType | null;
  workId?: number;
}

interface ProjectScheduleSummary {
  employeeName: string;
  scheduleCount: number;
}
const ProjectMasterSummaryModal = ({ visible, onClose, onSubmit, data, workId }: Props) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [workId]);

  const {
    data: projectData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['project-schedule-summary', data?.projectId, workId, page, pageSize],
    queryFn: () => getScheduleByProject(data?.projectId ?? 0, workId ?? 0, page, pageSize),
    enabled: !!data?.projectId,
  });

  const { data: scheduleCounts, isLoading: isLoadingCounts } = useQuery<ProjectScheduleSummary[]>({
    queryKey: ['project-schedule-summary-total', data?.projectId, workId],
    queryFn: () => getScheduleByProjectSummary(data?.projectId ?? 0, workId ?? 0),
    enabled: !!data?.projectId,
  });

  const processedData: Schedule[] | any = projectData?.content || [];

  const columns: DataColumn[] = [
    {
      id: 'employeeName',
      header: 'Employee Name',
      accessorKey: 'employeeName',
      sortable: true,
      cell: (row: Schedule) => row?.user?.username,
    },
    {
      id: 'scheduleDate',
      header: 'Schedule Date',
      accessorKey: 'scheduleDate',
      sortable: true,
      cell: (row) => formatDate(row.scheduleDate),
    },
    {
      id: 'work',
      header: 'Work',
      accessorKey: 'work',
      sortable: true,
      cell: (row) => row?.work?.workName,
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      sortable: true,
    },
  ];
  const summaryColumns: DataColumn[] = [
    {
      id: 'employeeName',
      header: 'Employee Name',
      accessorKey: 'employeeName',
      sortable: true,
    },
    {
      id: 'scheduleCount',
      header: 'Total Days of Project',
      accessorKey: 'scheduleCount',
      sortable: true,
    },
  ];

  const handlePaginationChange = (pageNumber: number, pageSizeNumber: number) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
  };

  return (
    <Modal
      //   title={'Project Summary for ' + data?.projectName}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <div className="p-2">
        <DataTable
          data={processedData || []}
          isLoading={isLoading}
          columns={columns}
          tableTitle={`${
            workId == 1 ? 'Project Commissioning' : 'Software Development '
          } Schedule Summary for ${data?.customerName || ''} : ${data?.projectNo || ''}`}
          tableDescription={`Schedule Summary for ${data?.projectName || ''}`}
          onAddClick={() => {}}
          onRefreshClick={() => {
            refetch();
            toast.success('Project Data Refreshed Successfully');
          }}
          getRowClassName={getRowColors}
          totalPages={projectData?.totalPages}
          totalElements={projectData?.totalElements}
          numberOfElements={processedData?.length}
          currentPage={page}
          pageSize={pageSize}
          onPaginationChange={handlePaginationChange}
          needSearch={false}
          needRefreshBtn={true}
        />
      </div>

      <br />
      <hr />
      <div className="p-2">
        <DataTable
          data={scheduleCounts || []}
          isLoading={isLoadingCounts}
          columns={summaryColumns}
          tableTitle={`${
            workId == 1 ? 'Project Commissioning' : 'Software Development '
          } Work Schedule Total Days  :- ${data?.projectNo || ''}`}
          tableDescription={`Total days of project per employee`}
          onAddClick={() => {}}
          onRefreshClick={() => {
            refetch();
            toast.success('Project Data Refreshed Successfully');
          }}
          getRowClassName={getRowColors}
          needSearch={false}
          needRefreshBtn={false}
        />
      </div>
    </Modal>
  );
};

export default ProjectMasterSummaryModal;
