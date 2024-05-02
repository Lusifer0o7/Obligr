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
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

import axios from "axios";
import UpdateUser from "views/UpdateUser";
import LoginSignUp from "views/LoginSignUp";
import UserList from "views/UserList";
import CreateRole from "views/RoleViews/CreateRole";
import UpdateRoles from "views/RoleViews/UpdateRoles";
import CreateWebsite from "views/WebsiteViews.js/CreateWebsite";
import WebsiteList from "views/WebsiteViews.js/WebsiteList";

var ps;

function Admin(props) {
  axios.defaults.withCredentials = true;
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     document.documentElement.className += " perfect-scrollbar-on";
  //     document.documentElement.classList.remove("perfect-scrollbar-off");
  //     ps = new PerfectScrollbar(mainPanelRef.current, {
  //       suppressScrollX: true,
  //     });
  //     let tables = document.querySelectorAll(".table-responsive");
  //     for (let i = 0; i < tables.length; i++) {
  //       ps = new PerfectScrollbar(tables[i]);
  //     }
  //   }
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //       document.documentElement.classList.add("perfect-scrollbar-off");
  //       document.documentElement.classList.remove("perfect-scrollbar-on");
  //     }
  //   };
  // });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Obligr";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            {location.pathname !== "/admin/login" && (
              <Sidebar
                routes={routes}
                logo={{
                  outterLink: "",
                  text: "Obligr",
                  imgSrc: logo,
                }}
                toggleSidebar={toggleSidebar}
              />
            )}
            <div className="main-panel" ref={mainPanelRef} data={color}>
              {location.pathname !== "/admin/login" && (
                <AdminNavbar
                  brandText={getBrandText(location.pathname)}
                  toggleSidebar={toggleSidebar}
                  sidebarOpened={sidebarOpened}
                />
              )}
              <Routes>
                {getRoutes(routes)}

                <Route path="/login" element={<LoginSignUp />} />

                <Route path="/user/:id" element={<UpdateUser />} />

                <Route path="/users/:keyword" element={<UserList />} />
                <Route path="/users" element={<UserList />} />

                <Route path="/create/role" element={<CreateRole />} />
                <Route path="/update/role" element={<UpdateRoles />} />

                <Route path="/create/website" element={<CreateWebsite />} />
                <Route path="/websites" element={<WebsiteList />} />

                <Route
                  path="/"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ||
                location.pathname === "/admin/login" ? null : (
                  <Footer fluid />
                )
              }
            </div>
          </div>
          {location.pathname !== "/admin/login" && (
            <FixedPlugin bgColor={color} handleBgClick={changeColor} />
          )}
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
