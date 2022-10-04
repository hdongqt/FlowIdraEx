import React from "react";
import { Link } from "react-router-dom";
import { SideBarContainer, SideBarLogo, SideBarMenu } from "./SideBar.style";
const SideBar = () => {
  return (
    <SideBarContainer>
      <SideBarLogo to="/">
        <img src="https://jira.idra.al/secure/projectavatar?avatarId=10324" alt="logo" />
        <h2>VN - Interns</h2>
      </SideBarLogo>
      <SideBarMenu>
        <li>
          <Link to="/">Kanban board</Link>
        </li>
        <li>
          <Link to="/backlog">Backlog</Link>
        </li>
      </SideBarMenu>
    </SideBarContainer>
  );
};

export default SideBar;
