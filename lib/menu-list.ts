import {
   
    LayoutGrid,
    SettingsIcon,
    Shield,
    AppWindow,
    Cable
  } from "lucide-react";
  
  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: any;
    submenus: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };
  
  export function getMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/",
            label: "Dashboard",
            active: pathname.includes("/"),
            icon: LayoutGrid,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "",
        menus: [
          
          {
            href: "/admins",
            label: "Adminstrators",
            active: pathname.includes("/admins"),
            icon: Shield,
            submenus: []
          },
          {
            href: "/applicationdetails",
            label: "Application Details",
            active: pathname.includes("/applicationdetails"),
            icon: AppWindow,
            submenus: []
          },
          {
            href: "/applicationflows",
            label: "Application Flows",
            active: pathname.includes("/applicationdflows"),
            icon: Cable,
            submenus: []
          },
          {
            href: "",
            label: "Manage",
            active: pathname.includes("/manage"),
            icon: SettingsIcon,
            submenus: [
              {
                href: "/manage/newApp",
                label: "Application",
                active: pathname === "/manage/newApp"
              },
              {
                href: "/manage/manageURLs",
                label: "URL",
                active: pathname === "/manage/manageURLs"
              },
              {
                href: "/manage/manageAdmins",
                label: "Adminstrators",
                active: pathname === "/manage/manageAdmins"
              }
            ]
          },
        ]
      },
      
    ];
  }
  