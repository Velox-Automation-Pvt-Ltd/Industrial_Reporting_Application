import { FC } from 'react';
import { Outlet } from 'react-router';

import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Topbar from './header/Topbar';
// import { AuthWatcher } from 'src/utils/AuthWatcher';

const FullLayout: FC = () => {
  return (
    <>
      {/* <AuthWatcher /> */}
      {/* <Topbar /> */}
      <div className="flex w-full ">
        <div className="flex w-full">
          <Sidebar />
          <div className="container flex flex-col w-full pt-6 ">
            {/* Top Header  */}

            <Header />

            <div className={`h-full  page-wrapper`}>
              {/* Body Content  */}
              <div className={`w-full`}>
                <div className="container px-0 py-6">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullLayout;
