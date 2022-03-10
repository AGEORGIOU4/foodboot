import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import {
  CCol,
  CFormLabel,
  CSpinner,
  CCard,
  CCardBody,
  CRow,
  CImage,
  CCardHeader,
  CButton,
} from '@coreui/react-pro'
import avatar from './../../assets/images/avatars/avatar.png'
import { FormatTimestampFunction, mainUrl } from 'src/components/Common';
import { restApiGet } from 'src/components/apiCalls/rest';
import CIcon from '@coreui/icons-react';
import { cilPrint } from '@coreui/icons-pro';
import { cilPencil } from '@coreui/icons';
import { Route } from 'react-router-dom';

const ViewClient = (props) => {
  const print = (e) => {
    e.preventDefault()
    window.print()
  }

  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState("")

  var tmpClient = "";
  var basic_info = "";
  var medical_history = "";

  if (props.location.state) {
    basic_info = props.location.state;

    React.useEffect(() => {
      setLoading(true);
      Promise.resolve(
        restApiGet(mainUrl + '/clients/medical-histories/' + basic_info.id)
          .then(function (value) {
            medical_history = value;
            tmpClient = { ...basic_info, ...medical_history };
            setClient(tmpClient);

            console.log(client);
            setLoading(false);
          }));
    }, []);

  }

  return (
    <Route render={({ history }) => (
      <>
        <CCard>
          <CCardHeader>
            <CButton
              className="me-1 float-end"
              size="sm"
              color='secondary'
              variant="ghost"
              onClick={print}
            >
              <CIcon icon={cilPrint} /> Print
            </CButton>

            <CButton
              href='#/edit-client'
              className="me-1 float-end"
              size="sm"
              color='success'
              variant="ghost"
              onClick={() => { history.push({ pathname: "/edit-client", state: client }) }}
            ><CIcon icon={cilPencil} /> Edit
            </CButton>


          </CCardHeader>
          <CCardBody style={{ display: (loading) ? "none" : "block" }}>
            <CRow>
              <CCol md={2} style={{ textAlign: 'center', margin: '0px 10px 25px 0' }}>
                <CImage width={100} src={avatar} />
              </CCol>


              <CCol md={4} style={{ marginTop: '45px' }}>
                <CFormLabel><strong>First name:</strong> {client.first_name}</CFormLabel>

              </CCol>
              <CCol md={4} style={{ marginTop: '45px' }}>
                <CFormLabel ><strong>Last name:</strong> {client.last_name}</CFormLabel>

              </CCol>
            </CRow>

            <CRow>
              <CCol md={3}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Date of birth</CFormLabel>
                <p>{FormatTimestampFunction(client.dob)}</p>
              </CCol>

              <CCol md={5}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Email</CFormLabel>
                <p>{client.email}</p>
              </CCol>
              <CCol md={4}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Phone</CFormLabel>
                <p>{client.phone}</p>
              </CCol>
            </CRow>

            <CRow>
              <CCol md={3}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Address</CFormLabel>
                <p>{client.address}</p>
              </CCol>

              <CCol md={9}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Food allergies</CFormLabel>
                <p>{client.food_allergies}</p>
              </CCol>
            </CRow>

          </CCardBody>

          <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
            <CSpinner color='primary' variant='grow' />
          </CCardBody>

        </CCard>

        <div style={{ margin: '20px 0px', fontWeight: '900' }}>
          Medical History
        </div>

        <CCard>
          <CCardBody style={{ display: (loading) ? "none" : "block" }}>
            <CRow>
              <CCol md={4}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Date</CFormLabel>
                <p>{FormatTimestampFunction(client.date)}</p>
              </CCol>
              <CCol md={4}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Height</CFormLabel>
                <p>{client.height}</p>
              </CCol>
              <CCol md={4}>
                <CFormLabel style={{ fontWeight: 'bold' }}>Weight</CFormLabel>
                <p>{client.weight}</p>
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
            <CSpinner color='primary' variant='grow' />
          </CCardBody>
        </CCard>
      </>
    )} />
  )
}

export default withAuthenticationRequired(ViewClient)