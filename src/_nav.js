import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCalendar,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilEnvelopeOpen,
  cilGrid,
  cilLayers,
  cilMap,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { cilFastfood, cilKey, cilNote, cilUserSecret } from '@coreui/icons-pro'

const _nav = [
  {
    component: CNavTitle,
    name: 'Nutritionist Panel',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Calendar',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    to: '/calendar',
  },
  {
    component: CNavItem,
    name: 'Clients',
    to: '/clients',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Meal Plans',
    to: '/meal-plans',
    icon: <CIcon icon={cilNote} customClassName="nav-icon" />,
    badge: {
      color: 'success-gradient',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Nutrition Facts',
    to: '/nutrition-facts',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Analytics',
    to: '/analytics',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Admin Panel',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilKey} customClassName="nav-icon" />,
  }
]

export default _nav
