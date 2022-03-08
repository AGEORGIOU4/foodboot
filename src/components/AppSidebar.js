import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CLink, CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react-pro'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CLink disabled href='/'>
          <img
            alt='SMN-logo-minimized'
            className="sidebar-brand-full"
            src='foodboot-logo.png'
            height={50} />
          <img
            alt='SMN-logo-minimized'
            className="sidebar-brand-narrow"
            src='foodboot-logo.png'
            height={50} />
        </CLink>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
