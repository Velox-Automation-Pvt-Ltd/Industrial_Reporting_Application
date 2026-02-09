import { Greeting } from 'src/utils/Greetings';
import TeamSchedule from '../common/TeamSchedule';

export default function ManagementDashboard() {
  return (
    <div>
      <div className="mb-8 ml-2">
        <div className="ml-3">
          <Greeting />
        </div>
        {/* <p className="text-gray-600">Manage your schedules and track 
        your activities</p> */}
        <TeamSchedule />
      </div>
    </div>
  );
}
