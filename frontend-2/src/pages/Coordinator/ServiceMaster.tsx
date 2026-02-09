import { useState, useCallback } from 'react';
import { DataTable } from 'src/components/tables/DataTable';
import { DataColumn } from 'src/types';
import IconButton from 'src/components/Buttons/IconButton';
import Iconify from 'src/components/Buttons/Iconify';
import getRowColors from 'src/utils/getRowColors';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchServiceMasterData } from 'src/actions/Master/MasterAction';
import { useCreateService, useUpdateServiceMaster } from 'src/api/mutations/master/masterMutation';
import { Service } from 'src/types/master';
import ServiceMasterModal from 'src/components/modal/ServiceMasterModal';

export default function ServiceMaster() {
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRecord, setEditRecord] = useState<Service | null | undefined>(null);

  const {
    data: ServicesMasterData,
    isLoading,
    refetch,
    isError,
  } = useQuery<any>({
    queryKey: ['services', page, pageSize, searchTerm],
    queryFn: () => fetchServiceMasterData(page, pageSize, searchTerm),
  });

  const { mutate: createServiceApiCall } = useCreateService();
  const { mutate: updateServiceApiCall } = useUpdateServiceMaster();

  const data = ServicesMasterData || [];

  const handlePaginationChange = useCallback((pageNumber: number, pageSizeNumber: number) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
  }, []);

  const openDeleteDialog = (data: any) => {
    // setIsDeleteModalOpen(true);
  };

  const openEditDialog = (record: Service) => {
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const openViewDialog = (record: Service) => {
    setEditRecord(record);
    setViewModalVisible(true);
  };

  const columns: DataColumn[] = [
    // {
    //   id: 'serviceId',
    //   header: 'Service Id',
    //   accessorKey: 'serviceId',
    //   sortable: true,
    // },
    {
      id: 'customerName',
      header: 'Customer Name',
      accessorKey: 'customerName',
      sortable: false,
    },
    {
      id: 'servicePoNumber',
      header: 'Service Po No.',
      accessorKey: 'servicePoNumber',
      sortable: true,
      cell: (row: Service) => row?.servicePoNumber || '—',
    },
    {
      id: 'serviceDays',
      header: 'Service Days',
      accessorKey: 'serviceDays',
      sortable: false,
      cell: (row: Service) => (row?.serviceDays ? row.serviceDays : '-'),
    },
    {
      id: 'serviceRemainingDays',
      header: 'Service Remaining Days',
      accessorKey: 'serviceRemainingDays',
      sortable: false,
      cell: (row: Service) => {
        return row.serviceRemainingDays ? row.serviceRemainingDays : '-';
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
              title="View Service Data"
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
            {/* <IconButton
              title="Delete Schedule"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteDialog(row);
              }}
            >
              <Iconify icon="mdi:delete" className="w-5 h-5" />
            </IconButton> */}
          </div>
        );
      },
    },
  ];

  const handleRefresh = () => {
    refetch();
    if (!isError) {
      toast.success('Service Master Data refresh⚡️');
    }
  };

  const handleCreateService = (data: Service) => {
    createServiceApiCall(data);
    setVisible(false);
  };

  const handleUpdateService = (data: Service) => {
    const updateNewServiceData = {
      serviceId: editRecord?.serviceId,
      data,
    };

    updateServiceApiCall(updateNewServiceData);

    setEditModalVisible(false);
  };

  const handleAddClick = () => {
    setVisible(true);
  };

  const handleSearchChange = useCallback(
    (search: string) => {
      // Reset to first page when search term changes
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
        tableTitle="Service Master"
        tableDescription={`Service Master Data Records`}
        onRefreshClick={handleRefresh}
        getRowClassName={getRowColors}
        // filterableColumns={['employeeName']}
        totalPages={data?.totalPages}
        totalElements={data?.totalElements}
        numberOfElements={data?.length}
        currentPage={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        addBtnText="Add New Service"
        onAddClick={handleAddClick}
        onSearchChange={handleSearchChange}
        useDebounceSearch={true}
        searchDebounceDelay={500}
        searchPlaceholder="Search Services..."
      />

      <ServiceMasterModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleCreateService}
        // initialData={editRecord}
        mode={'create'}
      />

      <ServiceMasterModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleUpdateService}
        initialData={editRecord}
        mode={'edit'}
      />
      <ServiceMasterModal
        visible={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
        onSubmit={() => {}}
        initialData={editRecord}
        mode="view"
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
