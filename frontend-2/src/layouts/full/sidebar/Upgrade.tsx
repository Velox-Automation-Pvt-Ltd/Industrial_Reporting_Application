import { Button } from 'flowbite-react';
import UpgradePlan from '/src/assets/images/backgrounds/upgrade.svg';
import { Link, useNavigation } from 'react-router';
import { handleLogout } from 'src/actions/Auth/authAction';
import { useAppDispatch } from 'src/store/hooks/reduxHooks';
const Upgrade = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation();
  return (
    <>
      <div className="px-5 mt-2 relative">
        <div className="bg-primary/10 py-4 px-5 rounded-xl ">
          <div className="grid grid-cols-12">
            <div className="col-span-7">
              {/* <h6 className="text-base text-dark">Check Pro Version</h6> */}
              <Button
                onClick={() => handleLogout()}
                color={'primary'}
                className="mt-3 rounded-full font-medium  w-fit px-5"
                size="sm"
              >
                Logout
              </Button>
            </div>
            {/* <img src={UpgradePlan} alt="upgrade" className="absolute h-24 w-24 end-0" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Upgrade;
