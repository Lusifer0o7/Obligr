import React, { useState } from "react";
import { NavLink } from "reactstrap";

function SidebarItem({ title, icon, normalText, isActive, items }) {
  const [isCollapsed, setIsCollapsed] = useState(!isActive);
  const [caretRotation, setCaretRotation] = useState(false);

  const handleCaretClick = () => {
    setIsCollapsed(!isCollapsed);
    setCaretRotation(!caretRotation);
  };

  return (
    <li className={!isCollapsed ? "active" : ""} onClick={handleCaretClick}>
      {console.log()}
      <a
        href="#"
        data-toggle="collapse"
        className={isCollapsed ? "collapsed" : "show"}
      >
        <i className={icon}></i>
        <p>
          {title}
          <b
            className="caret"
            style={{
              transform: caretRotation ? "rotate(180deg)" : "rotate(0deg)",
            }}
          ></b>
        </p>
      </a>
      <div className={`collapse ${isCollapsed ? "" : "show"}`}>
        <ul style={{ listStyleType: "none" }}>
          {items.map((item, index) => (
            <li key={index} className={item.isActive ? "active" : ""}>
              <a href={item.href} aria-current="page">
                <i className={item.miniIcon}></i>
                <span className="sidebar-normal">{item.normalText}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default SidebarItem;
