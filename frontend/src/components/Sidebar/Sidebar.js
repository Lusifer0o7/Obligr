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
/*eslint-disable*/
import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";
import { useSelector } from "react-redux";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);
  let isActive = true;

  const { loading, user } = useSelector((state) => state.user);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const [collapse, setcollapse] = useState(false);

  const handleCaretClick = (prop) => {
    prop.state = prop.state == "show" ? "hide" : "show";
    setcollapse(!collapse);
    // setCaretRotation(!caretRotation);
  };

  const linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  const { routes, rtlActive, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }
  }

  if (loading) {
    return (
      <div ref={mainPanelRef}>
        <Loader />
      </div>
    );
  }

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {logoText}
              </div>
            ) : null}
            <Nav>
              {routes.map((prop, key) => {
                if (prop.redirect) return null;

                const isSubMenu = prop.subMenu;

                return (
                  <React.Fragment key={key}>
                    {isSubMenu &&
                      user &&
                      user.role &&
                      user.role.permissions &&
                      prop.subMenu.some((ele) =>
                        user.role.permissions.some(
                          (permission) => permission.path === ele.path
                        )
                      ) && (
                        <li onClick={() => handleCaretClick(prop)}>
                          <a
                            data-toggle="collapse"
                            className={collapse ? "collapsed" : "show"}
                          >
                            <i className={prop.icon}></i>
                            <p>
                              {prop.name}
                              <b
                                className="caret"
                                style={{
                                  transform:
                                    prop.state === "show"
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                }}
                              ></b>
                            </p>
                          </a>
                        </li>
                      )}
                    <div className={`collapse ${isSubMenu ? prop.state : ""}`}>
                      <ul style={{ listStyleType: "none" }}>
                        {isSubMenu &&
                          prop.subMenu.map(
                            (ele, subKey) =>
                              user &&
                              user.role &&
                              user.role.permissions &&
                              user.role.permissions.some(
                                (permission) => permission.path === ele.path
                              ) && (
                                <li
                                  className={
                                    activeRoute(ele.path) +
                                    (prop.pro ? " active-pro" : "")
                                  }
                                  key={subKey}
                                >
                                  <NavLink
                                    to={`/${user.role.name}${ele.path}`}
                                    className="nav-link"
                                    onClick={props.toggleSidebar}
                                  >
                                    <i className={ele.icon} />
                                    <p>{ele.name}</p>
                                  </NavLink>
                                </li>
                              )
                          )}
                      </ul>
                    </div>
                    {!isSubMenu && (
                      <li
                        className={
                          activeRoute(prop.path) +
                          (prop.pro ? " active-pro" : "")
                        }
                        key={key}
                      >
                        {user &&
                          user.role &&
                          user.role.permissions &&
                          user.role.permissions.some(
                            (permission) => permission.path === prop.path
                          ) && (
                            <NavLink
                              to={`/${user.role.name}${prop.path}`}
                              className="nav-link"
                              onClick={props.toggleSidebar}
                            >
                              <i className={prop.icon} />
                              <p>{prop.name}</p>
                            </NavLink>
                          )}
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
    closeSidebar: PropTypes.func,
  }),
};

export default Sidebar;
