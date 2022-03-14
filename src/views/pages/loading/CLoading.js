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
        <CImage
          className="sidebar-brand-full"
          src={props.image_source}
          height={200} />

        {/* <h1>Welcome to foodboot</h1> */}
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

