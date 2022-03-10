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
import { cilPencil, cilSave } from '@coreui/icons';

const EditClient = (props) => {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  var id = "";
  var basic_info = "";
  var medical_history = "";

  if (props.location.state) {
    id = props.location.state.id;
    basic_info = props.location.state;

    React.useEffect(() => {
      setLoading(true);
      Promise.resolve(
        restApiGet(mainUrl + '/clients/medical-histories/' + id)
          .then(function (value) {
            medical_history = value;


            setDate(FormatTimestampFunction(medical_history.date));
            setHeight(medical_history.height);
            setWeight(medical_history.weight);

            setLoading(false);
          }));
    }, []);
  }

  const [first_name, setFirstName] = useState(basic_info.first_name);
  const [last_name, setLastName] = useState(basic_info.last_name);
  const [dob, setDob] = useState(FormatTimestampFunction(basic_info.dob));
  const [email, setEmail] = useState(basic_info.email);
  const [phone, setPhone] = useState(basic_info.phone);
  const [address, setAddress] = useState(basic_info.address);
  const [food_allergies, setFoodAllergies] = useState(basic_info.food_allergies);

  const [date, setDate] = useState(FormatTimestampFunction(medical_history.date));
  const [height, setHeight] = useState(medical_history.height);
  const [weight, setWeight] = useState(medical_history.weight);

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      basic_info = {
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        email: email,
        phone: phone,
        address: address,
        food_allergies: food_allergies
      }

      medical_history = {
        date: date,
        height: height,
        weight: weight
      }

      setLoading(true);

      Promise.resolve(
        restApiPut(mainUrl + '/clients/update/' + id, basic_info, 'Client Updated!', 'bottom-end', true)
          .then(function (value) {
            setLoading(false);
          }));

      Promise.resolve(
        restApiPut(mainUrl + '/clients/medical-histories/update/' + id, medical_history, 'Medical History Updated!', 'bottom-end', false)
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
              ><CIcon icon={cilPencil} /> Save
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
                  <CFormInput type="text" id="validationCustom01" value={first_name} required onChange={e => setFirstName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Last name</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" value={last_name} required onChange={e => setLastName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom03">DOB</CFormLabel>
                  <CFormInput type="date" id="validationCustom03" value={dob} required onChange={e => setDob(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom04">Email</CFormLabel>
                  <CFormInput type="text" id="validationCustom04" value={email} required onChange={e => setEmail(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom05">Phone</CFormLabel>
                  <CFormInput type="text" id="validationCustom05" value={phone} required onChange={e => setPhone(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom06">Address</CFormLabel>
                  <CFormInput type="text" id="validationCustom06" value={address} required onChange={e => setAddress(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom07">Food allergies</CFormLabel>
                  <CFormInput type="text" id="validationCustom07" value={food_allergies} required onChange={e => setFoodAllergies(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <hr />

                <div style={{ margin: '20px 0px', fontWeight: '900' }}>
                  Medical History
                </div>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom08">Date Updated</CFormLabel>
                  <CFormInput type="date" id="validationCustom08" value={date} required onChange={e => setDate(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom09">Height</CFormLabel>
                  <CFormInput type="text" id="validationCustom09" value={height} required onChange={e => setHeight(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom10">Weight</CFormLabel>
                  <CFormInput type="text" id="validationCustom10" value={weight} required onChange={e => setWeight(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

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