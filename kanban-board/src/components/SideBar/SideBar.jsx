import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SideBarContainer, SideBarLogo, SideBarMenu } from "./SideBar.style";
const SideBar = () => {
  const listNav = [
    {
      name: "Kanban board",
      path: "/",
    },
    {
      name: "Backlog",
      path: "/backlog",
    },
  ];

  const { pathname } = useLocation();

  return (
    <SideBarContainer>
      <SideBarLogo to="/">
        <img src="https://jira.idra.al/secure/projectavatar?avatarId=10324" alt="logo" />
        <h2>VN - Interns</h2>
      </SideBarLogo>
      <SideBarMenu>
        {listNav &&
          listNav.map((item, index) => {
            return (
              <li key={index} className={item.path === pathname ? "active" : ""}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            );
          })}
      </SideBarMenu>
    </SideBarContainer>
  );
};

export default SideBar;
