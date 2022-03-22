import React from 'react'
import {
  CCol,
  CContainer,
  CImage,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
export const CLoading = (props) => {

  return (
    <div>
      <CContainer style={{ textAlign: 'center' }}>
        {/* <h1>Welcome to foodboot</h1> */}
        <CImage src='foodboot-logo-landscape.png' height={'150px'} />
        <p className="text-medium-emphasis">Loading...</p>
        <CRow>
          <CCol xs={12}>
            <CSpinner variant='border' color='dark'></CSpinner>
          </CCol>
        </CRow>

      </CContainer>
    </div>
  )
}

