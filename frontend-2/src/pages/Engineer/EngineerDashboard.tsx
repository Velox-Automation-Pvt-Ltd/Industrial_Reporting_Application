import MyTeamScheduleTable from 'src/components/dashboard/MyTeamScheduleTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Greeting } from 'src/utils/Greetings';
import { MapPin, Building, Home, Plane, Calendar, Info } from 'lucide-react';
import { Badge } from 'src/components/ui/badge';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { useQuery } from '@tanstack/react-query';
import {
  fetchTodaysSchedule,
  getScheduleByAllGroup,
  getScheduleByGroupForToday,
} from 'src/actions/schedule/ScheduleAction';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import { todaysDate } from 'src/utils/dateFormatter';
import { capitalizeFirstLetter } from 'src/utils/CapitalizeFirstLetter';
import { GroupByScheduleType } from 'src/types/data';
import { getAnalytics } from 'src/features/TeamAnalytics';
import { useNavigate } from 'react-router';
import ScheduleAnalystics from 'src/components/dashboard/ScheduleAnalystics';

const EngineerDashboard = () => {
  const userdata = useAppSelector((state: RootState) => state.auth.user);

  const { data: myAllGroupsData } = useQuery<GroupByScheduleType[]>({
    queryKey: ['allGroups'],
    queryFn: getScheduleByAllGroup,
  });

  const { office, site, siteAndOffice, leave } = getAnalytics(myAllGroupsData ?? []);

  const total = office + site + siteAndOffice + leave;

  const data = getScheduleByGroupForToday() || [];

  const todaysSchedule = data?.find((item: any) => item.user.userId === userdata?.id);

  const workCategories = [
    {
      id: 1,
      title: 'Office',
      days: office ?? 0,
      icon: Building,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      lightColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-600',
      description: 'At Office',
      percentage: 33.3,
    },
    {
      id: 2,
      title: 'Site',
      days: site ?? 0,
      icon: MapPin,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
      description: 'At Site Field visits',
      percentage: 50.0,
    },
    {
      id: 3,
      title: 'Office + Site',
      days: siteAndOffice ?? 0,
      icon: Home,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600',
      description: 'At Hybrid work location',
      percentage: 16.7,
    },
    {
      id: 4,
      title: 'Leave',
      days: leave ?? 0,
      icon: Plane,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600',
      description: 'on Leave',
      percentage: 0,
    },
  ];

  // Stats data
  const stats = {
    totalSchedules: 24,
    completedSchedules: 18,
    pendingSchedules: 6,
    siteVisits: 12,
  };
  const pinImage =
    'https://www.freepnglogos.com/uploads/pin-png/pin-transparent-png-pictures-icons-and-png-backgrounds-7.png';

  const completionRate = (stats.completedSchedules / stats.totalSchedules) * 100;

  const navigate = useNavigate();

  return (
    <>
      {/*  flex flex-wrap gap-24 mb-10 */}
      <div className="">
        <div className="mb-8 ml-2">
          <Greeting />
          {/* <p className="text-gray-600">Manage your schedules and track your activities</p> */}
        </div>

        {/* <div>
          <p>08-08-2025</p>
        </div> */}

        {/* <StickyNoteCard /> */}
      </div>

      {/* simple card design */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {workCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card
              key={category.id}
              className="group bg-white relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${category.lightColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1">
                      {category.days}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">{category.description}</p>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                      style={{ width: `${Math.min(100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="relative">
        <img
          src={pinImage}
          alt="Pin"
          className="absolute -top-5 -right-4 w-10 h-10 drop-shadow-lg rotate-[-20deg]"
        />
        <Card className=" shadow-lg mt-10 border-0 bg-gradient-to-r from-white to-gray-50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0D355C] rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-[#0D355C]">Today's Schedule</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  {todaysDate()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          {todaysSchedule ? (
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <MapPin className={`h-4 w-4 text-blue-500`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {todaysSchedule?.location?.locationName || '--'}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-[#0D355C] text-white text-xs px-2 py-1"
                        >
                          {todaysSchedule.isChargeable ? 'Chargeable' : 'Non-Chargeable'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {todaysSchedule?.project && (
                          <div>
                            Project :{' '}
                            <span className="font-medium">
                              {todaysSchedule?.project?.projectNo || ''} -{'  '}
                              {capitalizeFirstLetter(todaysSchedule?.project?.customerName) || ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center ml-10">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      {todaysSchedule?.status || '--'}
                    </Badge>
                  </div>
                </div>

                {todaysSchedule?.work && (
                  <p className="text-sm text-gray-700 ml-11">
                    Work : {todaysSchedule?.work?.workName || ''} -{' '}
                    {todaysSchedule?.description || ''}
                  </p>
                )}
              </div>

              <Alert className="border-yellow-200 bg-yellow-50">
                <Info className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <span className="font-medium">Remember:</span> Submit tomorrow's schedule before 6
                  PM today.
                </AlertDescription>
              </Alert>
            </CardContent>
          ) : (
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <Info className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <span className="font-medium">Alert:</span> You haven't add your Todays Schedule
                  yet
                </AlertDescription>
              </Alert>
              <div className="space-y-8">
                <button className="text-sm ">
                  create schedule for today :{' '}
                  <span
                    onClick={() => navigate('my-schedule')}
                    className="text-blue-500 cursor-pointer"
                  >
                    👉 click here
                  </span>
                </button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* <br /> */}

      {/* sticky note  new design */}
      {/* <ScheduleAnalystics /> */}

      {data && (
        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="lg:col-span-12 col-span-12">
            <MyTeamScheduleTable />
          </div>
        </div>
      )}
    </>
  );
};

export default EngineerDashboard;
