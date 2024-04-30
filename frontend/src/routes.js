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

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa-solid fa-chart-pie",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "fa-solid fa-address-card",
    component: <UserProfile />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "tim-icons icon-atom",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/map",
  //   name: "Map",
  //   icon: "tim-icons icon-pin",
  //   component: <Map />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "tim-icons icon-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  //{
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "tim-icons icon-align-center",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
];
export default routes;
