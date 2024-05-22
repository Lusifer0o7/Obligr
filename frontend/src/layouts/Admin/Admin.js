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
import React, { useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import LoginSignUp from "views/LoginSignUp";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader";
import ProtectedRoute from "ProtectedRoute";
import { loadUser } from "../../actions/userAction";
import UpdateUser from "views/UpdateUser";

var ps;

function Admin(props) {
  axios.defaults.withCredentials = true;
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
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

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (isAuthenticated) {
      navigate(`${user.role.name}/dashboard`);
    }
    dispatch(loadUser());
  }, []);

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.subMenu) {
        return getRoutes(prop.subMenu);
      } else {
        return (
          <Route
            path={`${user.role.name}${prop.path}`}
            element={prop.component}
            key={prop.name}
            exact
          />
        );
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

  if (loading) {
    return (
      <div ref={mainPanelRef}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <BackgroundColorContext.Consumer>
        {({ color, changeColor }) => (
          <React.Fragment>
            <div className="wrapper">
              {location.pathname !== "/login" &&
                user &&
                user.role &&
                user.role.permissions && (
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
                {location.pathname !== "/login" && (
                  <AdminNavbar
                    brandText={getBrandText(location.pathname)}
                    toggleSidebar={toggleSidebar}
                    sidebarOpened={sidebarOpened}
                  />
                )}
                <Routes>
                  {user && user.role && getRoutes(routes)}
                  <Route path="/login" element={<LoginSignUp />} />
                  <Route path="/update-user/:id" element={<UpdateUser />} />

                  {/* <Route
                    path="/"
                    element={<Navigate to="/admin/dashboard" replace />}
                  /> */}
                </Routes>
                {
                  // we don't want the Footer to be rendered on map page
                  location.pathname === "/admin/maps" ||
                  location.pathname === "/login" ? null : (
                    <Footer fluid />
                  )
                }
              </div>
            </div>
            {location.pathname !== "/login" && (
              <FixedPlugin bgColor={color} handleBgClick={changeColor} />
            )}
          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
    </>
  );
}

export default Admin;
