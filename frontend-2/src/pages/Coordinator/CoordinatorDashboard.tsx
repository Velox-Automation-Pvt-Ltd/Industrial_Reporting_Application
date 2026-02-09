import React from 'react';
import { Greeting } from 'src/utils/Greetings';
import TeamSchedule from '../common/TeamSchedule';

const CoordinatorDashboard = () => {
  return (
    <div>
      <div className="mb-8 ml-2">
        <div className="">
          <Greeting />
        </div>
        <TeamSchedule />
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
