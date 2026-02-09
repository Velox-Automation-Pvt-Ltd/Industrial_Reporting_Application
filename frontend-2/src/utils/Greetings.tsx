import { useAppSelector } from '@/store/hooks/reduxHooks';
import { capitalizeFirstLetter } from './CapitalizeFirstLetter';

export const Greeting = () => {
  const userdata = useAppSelector((state) => state.auth.user);

  const myDate = new Date();
  const hours = myDate.getHours();
  let greet: string;

  if (hours < 12) {
    greet = 'Morning 🌻';
  } else if (hours >= 12 && hours <= 17) {
    greet = 'Afternoon 🕒';
  } else if (hours >= 17 && hours <= 22) {
    greet = 'Evening ⛅';
  } else {
    greet = 'Night 🌙';
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full bg-white rounded-xl p-4 shadow-md">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0D355C]">
          Good {capitalizeFirstLetter(greet)},
          <span className="text-primary ml-1">
            {capitalizeFirstLetter(userdata?.name?.split(' ')[0]) || 'Admin'}!
          </span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Manage your schedules and track your activities.
        </p>
      </div>

      {/* Right Side: Role Badge */}
      <div className="mt-3 sm:mt-0">
        <span className="px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm">
          {userdata?.is_team_leader
            ? 'Team Leader'
            : capitalizeFirstLetter(userdata?.role) || 'Engineer'}
        </span>
      </div>
    </div>
  );
};
