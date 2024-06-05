/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import UserList from "views/UserList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import UpdateUser from "views/UpdateUser";
import CreateWebsite from "views/WebsiteViews.js/CreateWebsite";
import UpdateRoles from "views/RoleViews/UpdateRoles";
import WebsiteList from "views/WebsiteViews.js/WebsiteList";
import CreateRole from "views/RoleViews/CreateRole";
import ProductList from "views/ProductViews/ProductList";
import HomeMenuSetting from "views/SettingViews/HomeMenuSetting";
import HomeSliderSetting from "views/SettingViews/HomeSliderSetting";
import HomeFooterSetting from "views/SettingViews/HomeFooterSetting";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa-solid fa-chart-pie",
    component: <Dashboard />,
    //layout: "/admin",
  },
  {
    path: "/me",
    name: "Profile",
    icon: "fa-solid fa-address-card",
    component: <UserProfile />,
  },
  {
    name: "Manage User",
    icon: "fa-solid fa-users-gear",
    state: "hide",
    subMenu: [
      {
        path: "/users",
        icon: "fa-solid fa-list-ul",
        name: "User List",
        component: <UserList />,
      },
    ],
  },
  {
    name: "Website",
    icon: "fa-solid fa-globe",
    state: "hide",
    subMenu: [
      {
        path: "/create/website",
        icon: "fa-solid fa-wand-magic-sparkles",
        name: "Create Website",
        component: <CreateWebsite />,
      },
      {
        path: "/get/websites",
        icon: "fa-solid fa-list",
        name: "Website List",
        component: <WebsiteList />,

        layout: "/admin",
      },
    ],
  },
  {
    name: "Product",
    icon: "fa-solid fa-globe",
    state: "hide",
    subMenu: [
      {
        path: "/products",
        icon: "fa-solid fa-wand-magic-sparkles",
        name: "Products",
        component: <ProductList />,
      },
    ],
  },
  {
    name: "Roles & Permissions",
    icon: "fa-solid fa-key",
    layout: "/admin",
    subMenu: [
      {
        path: "/create/roles",
        icon: "fa-solid fa-plus",
        name: "Create Role",
        component: <CreateRole />,
        layout: "/admin",
      },
      {
        path: "/update/roles",
        icon: "fa-solid fa-file-pen",
        name: "Update Roles",
        component: <UpdateRoles />,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Settings",
    icon: "fa-solid fa-gear",
    layout: "/admin",
    subMenu: [
      {
        path: "/update/home-menus",
        icon: "fa-solid fa-bars",
        name: "Home Menu",
        component: <HomeMenuSetting />,
        layout: "/admin",
      },
      {
        path: "/update/home-sliders",
        icon: "fa-regular fa-images",
        name: "Home Slider",
        component: <HomeSliderSetting />,
        layout: "/admin",
      },
      {
        path: "/update/home-footer",
        icon: "fa-regular fa-window-maximize",
        name: "Home Footer",
        component: <HomeFooterSetting />,
        layout: "/admin",
      },
    ],
  },
];

export default routes;
