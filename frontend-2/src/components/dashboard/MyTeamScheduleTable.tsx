import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
} from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';

import user2 from '/src/assets/images/profile/user-3.jpg';
import user4 from '/src/assets/images/profile/user-5.jpg';
import user5 from '/src/assets/images/profile/user-1.jpg';
import { getLocationIcon } from 'src/utils/getLocationIcon';
import { getScheduleByGroupForToday } from 'src/actions/schedule/ScheduleAction';
import { capitalizeFirstLetter } from 'src/utils/CapitalizeFirstLetter';

const MyTeamScheduleTable = () => {
  const myTeamData = getScheduleByGroupForToday() || [];

  const renderCategoryBadge = (category: any) => {
    const status = category ? 'Chargeable' : 'Non-Chargeable';
    const colorMap = {
      Chargeable: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Non-Chargeable': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return <Badge className={colorMap[status] || ''}>{status}</Badge>;
  };

  const profileImages = [user2, user4, user5];

  const getRandomImage = () => {
    const index = Math.floor(Math.random() * profileImages.length);
    return profileImages[index];
  };

  return (
    <>
      <CardBox>
        <div className="flex justify-between align-baseline">
          <h5 className="card-title">My Group Schedule</h5>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <Table className="">
            <TableHead className="border-0">
              <TableHeadCell className="text-15 font-semibold  py-3 whitespace-nowrap">
                Profile
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold  py-3 whitespace-nowrap pl-6">
                Project No.
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold py-3 whitespace-nowrap">
                Work
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold py-3 whitespace-nowrap">
                Location
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold py-3 whitespace-nowrap">
                Category
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold py-3 whitespace-nowrap">
                Description
              </TableHeadCell>
            </TableHead>
            <TableBody className="">
              {myTeamData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex gap-4 items-center">
                      <img src={getRandomImage()} alt="icon" className="h-12 w-12 rounded-full" />
                      <div className="w-full md:pe-0 pe-10">
                        <h6 className="text-15 font-bold">{item?.user?.username ?? ''}</h6>
                        <p className="text-13 text-[12px] font-medium">
                          {capitalizeFirstLetter(item?.user?.role?.roleName) || ''}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap pl-10 ">
                    <p className="text-sm text-ld  font-medium">
                      {item?.project?.projectNo ?? '-'}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p className="text-ld text-sm  font-medium">{item?.work?.workName ?? '-'}</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap ">
                    <div className="flex items-center gap-2">
                      {getLocationIcon(item?.location?.locationName ?? '')}
                      <span className="text-sm">{item?.location?.locationName ?? ''}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap ">
                    {renderCategoryBadge(item?.isChargeable)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p className="text-ld text-sm  font-medium">{item?.description}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBox>
    </>
  );
};

export default MyTeamScheduleTable;
