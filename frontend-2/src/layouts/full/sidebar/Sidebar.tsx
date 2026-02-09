import { Sidebar, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import NavItems from './NavItems';
import SimpleBar from 'simplebar-react';
import React from 'react';
import FullLogo from '../shared/logo/FullLogo';
import Upgrade from './Upgrade';
import NavCollapse from './NavCollapse';
import { useAppSelector } from '@/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import { MenuItem } from 'src/types/menu/menu';
import { SidebarPermissionData } from 'src/config/sidebarConfig';
import { UserRole } from 'src/types';

const SidebarLayout = () => {
  const role = useAppSelector((state: RootState) => state.auth.user?.role);

  const data = SidebarPermissionData;

  const filterMenuByRole = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item: MenuItem) => !item.roles || (role && item.roles.includes(role as UserRole)))
      .map((item: MenuItem) => ({
        ...item,
        children: item.children ? filterMenuByRole(item.children) : [],
      }));
  };

  const filteredMenu: MenuItem[] = data ? filterMenuByRole(data as MenuItem[]) : [];

  const groupedMenu = filteredMenu.reduce<Record<string, MenuItem[]>>((groups, item) => {
    if (!item.children || item.children.length === 0) {
      groups['main'] = groups['main'] || [];
      groups['main'].push(item);
    } else {
      groups[item.name] = item.children;
    }
    return groups;
  }, {});

  return (
    <div className="xl:block hidden">
      <Sidebar
        className="fixed menu-sidebar bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0 rounded-2xl m-3 p-3 ml-2"
        aria-label="Sidebar with multi-level dropdown example"
      >
        <div className="px-5 py-4 flex items-center sidebarlogo">
          <FullLogo />
        </div>
        <SimpleBar className="h-[calc(100vh_-_294px)]">
          <SidebarItems className="mt-2">
            <SidebarItemGroup className="sidebar-nav hide-menu">
              {Object.entries(groupedMenu).map(([groupName, items], groupIndex) => (
                <div className="caption" key={`group-${groupIndex}`}>
                  {groupName !== 'main' && (
                    <h5 className="text-dark/60 uppercase font-medium leading-6 text-xs pb-2 ps-6">
                      {groupName}
                    </h5>
                  )}
                  {(items as any[]).map((item, itemIndex) => (
                    <React.Fragment key={`item-${item.id}-${itemIndex}`}>
                      {item.children?.length ? (
                        <div className="collpase-items">
                          <NavCollapse item={item} />
                        </div>
                      ) : (
                        <NavItems item={item} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </SidebarItemGroup>
          </SidebarItems>
        </SimpleBar>
        <div className="flex items-center justify-center mt-22">
          <Upgrade />
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
