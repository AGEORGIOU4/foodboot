import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButtonGroup,
  CFormCheck,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'


import {
  AppHeaderDropdown,
} from './header/index'

const AppHeader = () => {
  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const asideShow = useSelector((state) => state.asideShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img
            alt='SMN-logo-minimized'
            className="sidebar-brand-narrow"
            src='foodboot-logo.png'
            height={60} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink href="#/dashboard">Dashboard</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/clients">Clients</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
