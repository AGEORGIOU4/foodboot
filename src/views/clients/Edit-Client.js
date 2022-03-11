import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CSpinner,
  CCard,
  CCardHeader,
  CCardBody,
  CRow
} from '@coreui/react-pro'
import { FormatTimestampFunction, mainUrl } from 'src/components/Common';
import { restApiGet, restApiPut } from 'src/components/apiCalls/rest';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';

const EditClient = (props) => {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

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


  const [first_name, setFirstName] = useState(client.first_name);
  const [last_name, setLastName] = useState(client.last_name);
  const [dob, setDob] = useState(FormatTimestampFunction(client.dob));
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [address, setAddress] = useState(client.address);
  const [food_allergies, setFoodAllergies] = useState(client.food_allergies);

  const [date, setDate] = useState(FormatTimestampFunction(medical_history.date));
  const [height, setHeight] = useState(medical_history.height);
  const [weight, setWeight] = useState(medical_history.weight);

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      client = {
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        email: email,
        phone: phone,
        address: address,
        food_allergies: food_allergies
      }

      medical_history = {
        client_id: client_id,
        date: date,
        height: height,
        weight: weight
      }

      setLoading(true);

      // Update client
      Promise.resolve(
        restApiPut(mainUrl + '/clients/update/' + client_id, client, true)
          .then(function (value) {
            setLoading(false);
          }));

      Promise.resolve(
        restApiPut(mainUrl + '/clients/medical-histories/update/' + medical_history.id, medical_history, false)
          .then(function (value) {
            setLoading(false);
          }));
    }
    setValidated(true)
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CSpinner className="me-1 float-end" style={{ display: (loading) ? "block" : "none" }} color='primary' variant='grow' />
              <strong>Edit Client</strong>
              <CButton
                disabled={loading}
                className="me-1 float-end"
                size="sm"
                color='success'
                variant="ghost"
                onClick={handleSubmit}
              ><CIcon icon={cilSave} /> Save
              </CButton>
            </CCardHeader>
            <CCardBody style={{ display: (loading) ? "none" : "block" }}>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
              >
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">First name</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" value={client.first_name} required onChange={e => setFirstName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Last name</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" value={client.last_name} required onChange={e => setLastName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom03">DOB</CFormLabel>
                  <CFormInput type="date" id="validationCustom03" value={FormatTimestampFunction(client.dob)} required onChange={e => setDob(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom04">Email</CFormLabel>
                  <CFormInput type="text" id="validationCustom04" value={client.email} required onChange={e => setEmail(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom05">Phone</CFormLabel>
                  <CFormInput type="text" id="validationCustom05" value={client.phone} required onChange={e => setPhone(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom06">Address</CFormLabel>
                  <CFormInput type="text" id="validationCustom06" value={client.address} required onChange={e => setAddress(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom07">Food allergies</CFormLabel>
                  <CFormInput type="text" id="validationCustom07" value={client.food_allergies} required onChange={e => setFoodAllergies(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <hr />

                <div style={{ margin: '20px 0px', fontWeight: '900' }}>
                  Medical History
                </div>

                {medical_history.map((item) =>
                  <>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustom08">Date Updated</CFormLabel>
                      <CFormInput type="date" id="validationCustom08" value={FormatTimestampFunction(item.date)} required onChange={e => setDate(e.target.value)} />
                      <CFormFeedback valid>Looks good!</CFormFeedback>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustom09">Height</CFormLabel>
                      <CFormInput type="text" id="validationCustom09" required value={height} onChange={e => setHeight(e.target.value)} />
                      <CFormFeedback valid>Looks good!</CFormFeedback>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustom10">Weight</CFormLabel>
                      <CFormInput type="text" id="validationCustom10" value={item.weight} required onChange={e => setWeight(e.target.value)} />
                      <CFormFeedback valid>Looks good!</CFormFeedback>
                    </CCol>
                  </>
                )}


              </CForm>

            </CCardBody>

            <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
              <CSpinner color='primary' variant='grow' />
            </CCardBody>

          </CCard>
        </CCol>
      </CRow >
    </>
  )
}

export default withAuthenticationRequired(EditClient)