import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { REMOVE_USER_URL, SIGN_OUT_URL } from "../Constans/Fetch";

const ProfileIcon = ({
  onRouteChange,
  toggleModle,
  user,
  toggleModleRankList,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = window.sessionStorage.getItem("token");

  const onSignOut = () => {
    window.sessionStorage.removeItem("token");
    onRouteChange("signout");
    fetch(SIGN_OUT_URL, {
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
    fetch(REMOVE_USER_URL + user.id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          toggleModle();
          window.sessionStorage.removeItem("token");
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
          <DropdownItem onClick={() => toggleModleRankList()}>
            Rank List 
          </DropdownItem>
          <DropdownItem onClick={() => onSignOut()}>Signout</DropdownItem>
          <DropdownItem onClick={() => onDeleteUser()}>
            Delete user 
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
