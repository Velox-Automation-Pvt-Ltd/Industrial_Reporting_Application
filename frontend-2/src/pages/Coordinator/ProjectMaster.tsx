import { useState, useCallback } from 'react';
import { DataTable } from 'src/components/tables/DataTable';
import { DataColumn } from 'src/types';
import { Badge } from 'src/components/ui/badge';
import IconButton from 'src/components/Buttons/IconButton';
import Iconify from 'src/components/Buttons/Iconify';
import getRowColors from 'src/utils/getRowColors';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchProjectMasterData } from 'src/actions/Master/MasterAction';
import ProjectMasterModal from 'src/components/modal/ProjectMasterModal';
import {
  useCreateProjectMaster,
  useUpdateProjectMaster,
} from 'src/api/mutations/master/masterMutation';
import { ProjectMasterType } from 'src/types/master';
import { ProjectCustomerCell } from 'src/components/tables/ProjectCustomCell';
import ProjectMasterAnalyticsModal from 'src/components/modal/ProjectMasterAnalyticsModal';
import ProjectMasterSummaryModal from 'src/components/modal/ProjectMasterSummary';
import { useNavigate } from 'react-router';

export default function ProjectMaster() {
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewAnalyticsModalVisible, setViewAnalyticsModalVisible] = useState(false);
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRecord, setEditRecord] = useState<ProjectMasterType | null | undefined>(null);
  const [workId, setworkId] = useState(1);

  const {
    data: projectsMasterData,
    isLoading,
    refetch,
    isError,
  } = useQuery<any>({
    queryKey: ['projects', page, pageSize, searchTerm],
    queryFn: () => fetchProjectMasterData(page, pageSize, searchTerm),
  });

  const { mutate: createProjectApiCall } = useCreateProjectMaster();
  const { mutate: updateProjectApiCall } = useUpdateProjectMaster();

  const data = projectsMasterData || [];

  const handlePaginationChange = useCallback((pageNumber: number, pageSizeNumber: number) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
  }, []);

  const openDeleteDialog = (data: any) => {
    // setIsDeleteModalOpen(true);
  };

  const openEditDialog = (record: ProjectMasterType) => {
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const openViewDialog = (record: ProjectMasterType) => {
    setEditRecord(record);
    setViewModalVisible(true);
  };

  const openAnalyticsModal = (record: any) => {
    setEditRecord(record);
    setViewAnalyticsModalVisible(true);
  };

  const openSummaryModal = (record: any) => {
    setEditRecord(record);
    setSummaryModalVisible(true);
  };

  const handleDetailsOpen = (record: ProjectMasterType) => {
    setEditRecord(record);
    setSummaryModalVisible(true);
  };

  const columns: DataColumn[] = [
    // {
    //   id: 'projectNo',
    //   header: 'Project No.',
    //   accessorKey: 'projectNo',
    //   sortable: true,
    // },
    {
      id: 'customerName',
      header: 'Cutomer Details',
      accessorKey: 'customerName',
      sortable: false,
      cell: (row: ProjectMasterType) => (
        <ProjectCustomerCell
          setworkId={setworkId}
          project={row}
          onClick={() => handleDetailsOpen(row)}
        />
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (row: ProjectMasterType) => {
        const status = row?.completionStatus;

        const colorMap = {
          COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          IN_PROCESS: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
          NOT_STARTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          OVERDUE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        } as const;

        const statusKey = (status in colorMap ? status : 'IN_PROCESS') as keyof typeof colorMap;

        return (
          <Badge className={colorMap[statusKey] || ''} variant="outline">
            {row?.completionStatus ?? 'NOT_STARTED'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'actions',
      cell: (row: any) => {
        return (
          <div className="flex items-center gap-2">
            <IconButton
              title="View Project"
              onClick={(e) => {
                e.stopPropagation();
                openViewDialog(row);
              }}
            >
              <Iconify icon="mdi:eye" className="w-5 h-5" />
            </IconButton>
            <IconButton
              title="Edit"
              onClick={(e) => {
                e.stopPropagation();
                openEditDialog(row);
              }}
            >
              <Iconify icon="mdi:square-edit-outline" className="w-5 h-5" />
            </IconButton>
            <IconButton
              title="Analytics / Reports"
              onClick={(e) => {
                e.stopPropagation();
                openAnalyticsModal(row);
              }}
            >
              <Iconify icon="mdi:chart-pie" className="w-5 h-5" />
            </IconButton>
            {/* <IconButton
              title="Analytics / Reports"
              onClick={(e) => {
                e.stopPropagation();
                openSummaryModal(row);
              }}
            >
              <Iconify icon="mdi:file-document-check" className="w-5 h-5" />
            </IconButton> */}
          </div>
        );
      },
    },
  ];

  const handleRefresh = () => {
    refetch();
    if (!isError) {
      toast.success('Project Master Data refresh⚡️');
    }
  };

  const handleCreateProject = (data: ProjectMasterType) => {
    createProjectApiCall(data);
    setVisible(false);
  };

  const handleUpdateProject = (data: ProjectMasterType) => {
    const updateNewProjectData = {
      projectId: editRecord?.projectId,
      data,
    };

    updateProjectApiCall(updateNewProjectData);
    setEditModalVisible(false);
  };

  const handleAddClick = () => {
    setVisible(true);
  };

  const handleSearchChange = useCallback(
    (search: string) => {
      if (search !== searchTerm) {
        setPage(1);
      }
      setSearchTerm(search);
    },
    [searchTerm],
  );

  return (
    <div className="p-2 md:p-6 lg:p-4">
      <DataTable
        data={data?.content || []}
        isLoading={isLoading}
        columns={columns}
        tableTitle="Project Master"
        tableDescription={`Project Master Data Records`}
        onRefreshClick={handleRefresh}
        getRowClassName={getRowColors}
        // filterableColumns={['customerName']}
        totalPages={data?.totalPages}
        totalElements={data?.totalElements}
        numberOfElements={data?.length}
        currentPage={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        addBtnText="Add New Project"
        onAddClick={handleAddClick}
        onSearchChange={handleSearchChange}
        useDebounceSearch={true}
        searchDebounceDelay={500}
        searchPlaceholder="Search projects..."
      />

      <ProjectMasterModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleCreateProject}
        // initialData={editRecord}
        mode={'create'}
      />

      <ProjectMasterModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleUpdateProject}
        initialData={editRecord}
        mode={'edit'}
      />
      <ProjectMasterModal
        visible={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
        onSubmit={() => {}}
        initialData={editRecord}
        mode={'view'}
      />
      <ProjectMasterAnalyticsModal
        visible={viewAnalyticsModalVisible}
        onClose={() => setViewAnalyticsModalVisible(false)}
        onSubmit={() => {}}
        data={editRecord}
      />
      <ProjectMasterSummaryModal
        visible={summaryModalVisible}
        onClose={() => setSummaryModalVisible(false)}
        onSubmit={() => {}}
        data={editRecord}
        workId={workId}
      />

      {/* <DeleteModal
        onDeleteConfirm={handleDelete}
        isDeleteDialogOpen={isDeleteModalOpen}
        setIsDeleteDialogOpen={setIsDeleteModalOpen}
        modalTitle="Delete Schedule"
        modalDescription={`Are you sure you want to delete the Schedule ?`}
      /> */}
    </div>
  );
}
