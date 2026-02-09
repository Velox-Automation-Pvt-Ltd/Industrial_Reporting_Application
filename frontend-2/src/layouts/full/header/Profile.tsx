import { Button, Dropdown, DropdownItem } from 'flowbite-react';
import { Icon } from '@iconify/react';
import user4 from '/src/assets/images/profile/user-5.jpg';
import { Link, useNavigation } from 'react-router';
import { handleLogout } from 'src/actions/Auth/authAction';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/reduxHooks';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation();

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="rounded-sm w-44"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <img src={user4} alt="logo" height="35" width="35" className="rounded-full" />
          </span>
        )}
      >
        <DropdownItem
          as={Link}
          to="/app/profile"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:user-circle-outline" height={20} />
          My Profile
        </DropdownItem>

        {/* 
        <DropdownItem
          as={Link}
          to="#"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:letter-linear" height={20} />
          My Account
        </DropdownItem> */}

        {/* <DropdownItem
          as={Link}
          to="#"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:user-circle-bold" height={20} />
          Welcome, {capitalizeFirstLetter(userdata?.name?.split(' ')[0]) || 'User'}!
        </DropdownItem>
        <hr /> */}
        {/* <DropdownItem
          as={Link}
          to="/app/my-schedule"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:checklist-linear" height={20} />
          My Schedule
        </DropdownItem> */}

        <div className="p-3 pt-0">
          <Button
            onClick={() => handleLogout()}
            size={'sm'}
            className="mt-2 border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none"
          >
            Logout
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
