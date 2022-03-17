import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
  CCol,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdown from './header/AppHeaderDropdown'
import { cidSignalCellularNoInternet0, cisSignal } from '@coreui/icons-pro'
import { SwalMixin } from './SweetAlerts/Swal'
import { useHistory } from 'react-router-dom';

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const online_connection = navigator.onLine;
  const history = useHistory();

  if (!online_connection) {
    SwalMixin('error', 'Network failed')
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/clients">Clients</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav>
          <CHeaderBrand>
            <CImage
              alt='foodboot-logo'
              src='foodboot-logo-landscape.png'
              height={30} />
          </CHeaderBrand>

          <CHeaderNav>
            <CHeaderBrand>
              <CIcon height={20} icon={(online_connection) ? cisSignal : cidSignalCellularNoInternet0} />
            </CHeaderBrand>
          </CHeaderNav>

          <AppHeaderDropdown />
        </CHeaderNav>

      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
