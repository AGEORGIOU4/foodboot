import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
} from '@coreui/react-pro'
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <img
                  alt='SMN-logo-minimized'
                  className="sidebar-brand-full"
                  src='foodboot-logo.png'
                  height={150} />

                {/* <h1>Welcome to foodboot</h1> */}
                <p className="text-medium-emphasis">Sign In to your account or create a new one</p>
                <CRow>
                  <CCol xs={6}>
                    <CButton color="primary" className="px-4" onClick={() => loginWithRedirect()}>
                      Login
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
