import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { CCol, CFormLabel, CSpinner, CCard, CCardBody, CRow, CImage, CCardHeader, CButton } from '@coreui/react-pro'
import avatar from './../../assets/images/avatars/avatar.png'
import { FormatTimestamp, mainUrl } from 'src/components/Common';
import { restApiGet } from 'src/components/apiCalls/rest';
import CIcon from '@coreui/icons-react';
import { cilPrint } from '@coreui/icons-pro';
import { cilPencil } from '@coreui/icons';
import { Route } from 'react-router-dom';
import { MedicalHistoriesViewTable } from './medical-histories/MedicalHistoriesViewTable';

const print = (e) => {
  e.preventDefault()
  window.print()
}

const ViewClient = (props) => {
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState("");
  const [medical_history, setMedicalHistory] = useState([]);

  const parameters = new URLSearchParams(props.location.search);
  const client_id = parameters.get('id');

  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/' + client_id)
        .then(function (value) {
          setClient(value);

          setLoading(false);
        }));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/medical-histories/' + client_id)
        .then(function (value) {
          setMedicalHistory(value);

          setLoading(false);
        }));
  }, []);

  return (
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

          <Route render={({ history }) => (
            <CButton
              className="me-1 float-end"
              size="sm"
              color='success'
              variant="ghost"
              onClick={() => { history.push({ pathname: "/edit-client", search: '?id=' + client_id, state: client }) }}
            ><CIcon icon={cilPencil} /> Edit
            </CButton>
          )} />

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
              <p><FormatTimestamp date={client.dob} /></p>
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
          <MedicalHistoriesViewTable data={medical_history} loading={loading} />
        </CCardBody>

        <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
          <CSpinner color='primary' variant='grow' />
        </CCardBody>
      </CCard>
    </>
  )
}

export default withAuthenticationRequired(ViewClient)