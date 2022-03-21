import React, { useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CRow,
} from '@coreui/react-pro'
import { auth0ApiCall, SetUserInfo } from 'src/api_calls/auth0.js'
import { CCalculator } from './tools'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const { user } = useAuth0();
  var userData = "";

  // Update User if missing data
  React.useEffect(() => {
    Promise.resolve(
      auth0ApiCall('GET', 'https://foodboot.eu.auth0.com/api/v2/users', 'q: ' + user.email + ', search_engine: v3', true)
        .then(function (value) {
          userData = value;
          if (!userData.given_name || !userData.family_name || !userData.user_metadata) {
            SetUserInfo(userData.user_id, userData.given_name, userData.family_name, userData.user_metadata);
          }
        }))
  });

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>

            <CCol md={8}>
              <WidgetsDropdown />
            </CCol>

            <CCol md={4}>
              <CCalculator />
            </CCol>

          </CRow>
        </CCardBody>
      </CCard >
    </>
  )
}

export default withAuthenticationRequired(Dashboard)
