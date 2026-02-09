import { useCallback, useState } from 'react';
import { DataTable } from 'src/components/tables/DataTable';
import { DataColumn } from 'src/types';
import IconButton from 'src/components/Buttons/IconButton';
import Iconify from 'src/components/Buttons/Iconify';
import getRowColors from 'src/utils/getRowColors';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchAmcServiceMasterData } from 'src/actions/Master/MasterAction';
import {
  useCreateAmcService,
  useUpdateAmcServiceMaster,
} from 'src/api/mutations/master/masterMutation';
import { AmcOrder } from 'src/types/master';
import AmcServiceModal from 'src/components/modal/AmcServiceModal';

export default function AmcMaster() {
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [editRecord, setEditRecord] = useState<AmcOrder | null | undefined>(null);

  const {
    data: AmcMasterData,
    isLoading,
    refetch,
    isError,
  } = useQuery<any>({
    queryKey: ['amc', page, pageSize, searchTerm],
    queryFn: () => fetchAmcServiceMasterData(page, pageSize, searchTerm),
  });

  const { mutate: createAmcApiCall } = useCreateAmcService();
  const { mutate: updateAmcApiCall } = useUpdateAmcServiceMaster();

  const data = AmcMasterData || [];

  const handlePaginationChange = useCallback((pageNumber: number, pageSizeNumber: number) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
  }, []);

  const openDeleteDialog = (data: any) => {
    // setIsDeleteModalOpen(true);
  };

  const openEditDialog = (record: AmcOrder) => {
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const openViewDialog = (record: AmcOrder) => {
    setEditRecord(record);
    setViewModalVisible(true);
  };

  const columns: DataColumn[] = [
    // {
    //   id: 'amcOrderId',
    //   header: 'Amc Service Id',
    //   accessorKey: 'amcOrderId',
    //   sortable: true,
    // },
    {
      id: 'customerName',
      header: 'Customer Name',
      accessorKey: 'customerName',
      sortable: false,
    },
    {
      id: 'amcPoNo',
      header: 'AMC Po No.',
      accessorKey: 'amcPoNo',
      sortable: true,
      cell: (row: AmcOrder) => row?.amcPoNo || '—',
    },
    {
      id: 'totalDays',
      header: 'Total Days',
      accessorKey: 'totalDays',
      sortable: false,
      cell: (row: AmcOrder) => (row?.totalDays ? row.totalDays : '-'),
    },
    {
      id: 'totalDaysRemaining',
      header: 'Remaining Days',
      accessorKey: 'totalDaysRemaining',
      sortable: false,
      cell: (row: AmcOrder) => (row?.totalDaysRemaining ? row.totalDaysRemaining : '-'),
    },
    {
      id: 'recurringMonth',
      header: 'Recurring Month',
      accessorKey: 'recurringMonth',
      sortable: false,
      cell: (row: AmcOrder) => {
        return row.recurringMonth ? row.recurringMonth : '-';
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
              title="View AMC Data"
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
      toast.success('Amc Master Data refresh⚡️');
    }
  };

  const handleCreateAmc = (data: AmcOrder) => {
    createAmcApiCall(data);
    setVisible(false);
  };

  const handleUpdateAmc = (data: AmcOrder) => {
    const updateNewAmcData = {
      amcOrderId: editRecord?.amcOrderId,
      data,
    };

    updateAmcApiCall(updateNewAmcData);
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
        tableTitle="AMC Service Master"
        tableDescription={`AMC Service Master Data Records`}
        onRefreshClick={handleRefresh}
        getRowClassName={getRowColors}
        // filterableColumns={['customerName']}
        totalPages={data?.totalPages}
        totalElements={data?.totalElements}
        numberOfElements={data?.length}
        currentPage={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        addBtnText="Add New AMC"
        onAddClick={handleAddClick}
        onSearchChange={handleSearchChange}
        useDebounceSearch={true}
        searchDebounceDelay={500}
        searchPlaceholder="Search AMC..."
      />

      <AmcServiceModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleCreateAmc}
        // initialData={editRecord}
        mode={'create'}
      />

      <AmcServiceModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleUpdateAmc}
        initialData={editRecord}
        mode={'edit'}
      />
      <AmcServiceModal
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
