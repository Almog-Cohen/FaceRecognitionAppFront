import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ProfileIcon = ({onRouteChange, toggleModle}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);


 
  const onSignOut = () => {
    
    const token = window.sessionStorage.getItem('token')
    window.sessionStorage.removeItem('token')
    onRouteChange('signout')
    fetch(`http://localhost:3001/signout`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(res => res.json())
    .catch( err => console.log(err))
  }

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
        <DropdownMenu right className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.8)'}}>
          <DropdownItem onClick={ () => toggleModle()}>View Profile</DropdownItem>
          <DropdownItem onClick={ () => onSignOut()}>Signout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
 
    </div>
  );
};

export default ProfileIcon;
