import { Sidebar, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import NavItems from './NavItems';
import SimpleBar from 'simplebar-react';
import React from 'react';
import FullLogo from '../shared/logo/FullLogo';
import 'simplebar-react/dist/simplebar.min.css';
import Upgrade from './Upgrade';
import NavCollapse from './NavCollapse';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import { SidebarPermissionData } from 'src/config/sidebarConfig';
import { MenuItem } from 'src/types/menu/menu';
import { UserRole } from 'src/types';

type MobileSidebarProps = {
  onClose?: () => void;
};

const MobileSidebar: React.FC<MobileSidebarProps> = ({ onClose }) => {
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
    <>
      <div>
        <Sidebar
          className="fixed menu-sidebar pt-0 bg-white dark:bg-darkgray transition-all"
          aria-label="Sidebar with multi-level dropdown example"
        >
          <div className="px-5 py-4  flex items-center sidebarlogo">
            <FullLogo />
          </div>
          <SimpleBar className="h-[calc(100vh_-_242px)]">
            <SidebarItems className=" mt-2">
              {/* <SidebarItemGroup className="sidebar-nav hide-menu">
                {SidebarContent &&
                  SidebarContent?.map((item, index) => (
                    <div className="caption" key={item.heading}>
                      <React.Fragment key={index}>
                        <h5 className="text-dark/60 uppercase font-medium leading-6 text-xs pb-2 ps-6">
                          {item.heading}
                        </h5>
                        {item.children?.map((child, index) => (
                          <React.Fragment key={child.id && index}>
                            <NavItems item={child} />
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    </div>
                  ))}
              </SidebarItemGroup> */}
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
                            <NavCollapse item={item} onClose={onClose} />
                          </div>
                        ) : (
                          <NavItems item={item} onClose={onClose} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </SidebarItemGroup>
            </SidebarItems>
          </SimpleBar>
          <Upgrade />
        </Sidebar>
      </div>
    </>
  );
};

export default MobileSidebar;
