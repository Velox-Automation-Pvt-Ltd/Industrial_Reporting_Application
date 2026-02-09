import { useCallback, useMemo, useState } from 'react';
import { DataTable } from 'src/components/tables/DataTable';
import { DataColumn } from 'src/types';
import { Badge } from 'src/components/ui/badge';
import { getRowColorsForUserManagemnt } from 'src/utils/getRowColors';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchAllUsers } from 'src/actions/Auth/authAction';
import { UserType } from 'src/types/auth/auth';
import DeleteModal from 'src/components/modal/DeleteModal';
import ActiveButton from 'src/components/Buttons/ActiveButton';
import SignUp from '../auth/SignUp';
import CreateNewUserModal from './CreateNewUserModal';
import { useUpadateUser } from 'src/api/mutations/auth/useSignInMutation';
import { capitalizeFirstLetter } from 'src/utils/CapitalizeFirstLetter';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(40);

  const {
    data: users,
    refetch,
    isError,
    isLoading,
  } = useQuery<UserType[]>({
    queryKey: ['user-management'],
    queryFn: () => fetchAllUsers(),
  });

  const { mutate: updateUser } = useUpadateUser();

  const processedData = useMemo(() => {
    if (!users) return [];

    let result = users.map((user: UserType) => ({
      userId: user?.userId,
      username: user?.username || '',
      role: user?.role?.roleName || '',
      email: user?.email || '',
      status: user?.isActive,
      group: user?.group?.groupName || '',
      isActive: user?.isActive,
    }));

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter((item: any) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(lowerTerm)),
      );
    }
    return result;
  }, [searchTerm, users, updateUser]);

  const handlePaginationChange = (pageNumber: number, pageSizeNumber: number) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
  };

  const handleUpdateUserStatus = (record: any) => {
    const updatedData = {
      isActive: !record.isActive,
    };
    updateUser({ userId: record.userId, body: updatedData });
  };

  const columns: DataColumn[] = [
    {
      id: 'username',
      header: 'Username',
      accessorKey: 'username',
      sortable: true,
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell(row: any) {
        return row?.role ? capitalizeFirstLetter(row?.role) : '-';
      },
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
    },
    {
      id: 'isActive',
      header: 'Account Status',
      accessorKey: 'isActive',
      sortable: true,
      cell: (row) => {
        const status = row.isActive ? 'Active' : 'Inactive';
        const colorMap = {
          Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          Inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        };

        return (
          <Badge className={colorMap[status] || ''} variant="outline">
            {status}
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
            <ActiveButton
              title="Inactive"
              isActive={!row.isActive}
              onClick={() => {
                handleUpdateUserStatus(row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleRefresh = () => {
    refetch();
    if (!isError) {
      toast.success('Users data refresh⚡️');
    }
  };

  const handleAssignScheduleClick = () => {
    setAddModalVisible(true);
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
        data={processedData}
        isLoading={isLoading}
        columns={columns}
        tableTitle="User Management"
        tableDescription={`Manage user accounts and permissions`}
        onRefreshClick={handleRefresh}
        getRowClassName={getRowColorsForUserManagemnt}
        currentPage={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        addBtnText="Create New User"
        searchPlaceholder="Search by user name"
        onAddClick={handleAssignScheduleClick}
        onSearchChange={handleSearchChange}
      />
      <CreateNewUserModal
        visible={addModalVisible}
        setVisible={setAddModalVisible}
        onClose={() => {
          setAddModalVisible(false);
          refetch();
        }}
      />

      <DeleteModal
        onDeleteConfirm={() => {}}
        isDeleteDialogOpen={isDeleteModalOpen}
        setIsDeleteDialogOpen={setIsDeleteModalOpen}
        modalTitle="Delete Schedule"
        modalDescription={`Are you sure you want to delete the Schedule ?`}
      />
    </div>
  );
}
