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
  cilEnvelopeOpen,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilArrowCircleLeft,
  cilArrowCircleRight,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useAuth0 } from "@auth0/auth0-react";
import avatar from './../../assets/images/avatars/avatar.png'

const AppHeaderDropdown = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={(isAuthenticated) ? user.picture : avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success-gradient" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger-gradient" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={() => loginWithRedirect()}>
          <CIcon icon={cilArrowCircleRight} className="me-2" />
          Login
        </CDropdownItem>
        <CDropdownItem href="#" onClick={() => logout({ returnTo: window.location.origin })}>
          <CIcon icon={cilArrowCircleLeft} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
