import React, { useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react-pro'
import { auth0ApiCall, SetUserInfo } from 'src/api_calls/auth0.js'
import { CCalculator } from './tools'

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
      <CCard className="mb-4">
        <CCardBody>
          <CRow>

            <CCol md={7}>

            </CCol>

            <CCol md={5} style={{ borderLeft: '2px solid' }}>
              <CCalculator />
            </CCol>

            <hr style={{ margin: '40px 0px 20px' }} />

          </CRow>
        </CCardBody>
      </CCard >
    </>
  )
}

export default withAuthenticationRequired(Dashboard)
