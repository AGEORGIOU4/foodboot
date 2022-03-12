import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import {
  cilSettings,
  cilUser,
  cilArrowCircleLeft,
  cilArrowCircleRight,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useAuth0 } from "@auth0/auth0-react";
import avatar from './../../assets/images/avatars/avatar.png'

const AppHeaderDropdown = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={(isAuthenticated) ? user.picture : avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={() => loginWithRedirect()}>
          <CIcon icon={cilArrowCircleRight} className="me-2" />
          Login
        </CDropdownItem>
        <CDropdownItem onClick={() => logout({ returnTo: window.location.origin })}>
          <CIcon icon={cilArrowCircleLeft} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
