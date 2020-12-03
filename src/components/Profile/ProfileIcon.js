import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ProfileIcon = ({ onRouteChange, toggleModle, user,toggleModleRankList }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = window.sessionStorage.getItem("token");
  
  const onSignOut = () => {
    window.sessionStorage.removeItem("token")
    onRouteChange("signout");
    fetch(`http://localhost:3001/signout`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const onDeleteUser = () => {
    fetch(`http://localhost:3001/removeUser/${user.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          toggleModle();
          window.sessionStorage.removeItem("token")
          onRouteChange("signout");
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  };

  // Show/Dismiss profile icon
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="pa4 tc">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 ba h3 w3 dib"
            alt="avatar"
          />
        </DropdownToggle>
        <DropdownMenu
          right
          className="b--transparent shadow-5"
          style={{
            marginTop: "20px",
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <DropdownItem onClick={() => toggleModle()}>
            View Profile
          </DropdownItem>
          <DropdownItem onClick={() => onSignOut()}>Signout</DropdownItem>
          <DropdownItem onClick={() => onDeleteUser()}>
            Delete user
          </DropdownItem>
          <DropdownItem onClick={() => toggleModleRankList()}>
            RankList Profile
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
