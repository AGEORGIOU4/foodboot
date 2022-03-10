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
  CCardBody,
  CCard,
  CCardHeader,
  CRow,
} from '@coreui/react-pro'
import { mainUrl } from 'src/components/Common';
import { restApiPost } from 'src/components/apiCalls/rest';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';

const CreateClient = () => {

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  var basic_info = "";

  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [food_allergies, setFoodAllergies] = useState();

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
      setLoading(true);

      Promise.resolve(
        restApiPost(mainUrl + '/clients/create/', basic_info, 'Client added!')
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
              <strong>Create Client</strong>
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
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
              >
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">First name</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" required onChange={e => setFirstName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Last name</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" required onChange={e => setLastName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom03">DOB</CFormLabel>
                  <CFormInput type="date" id="validationCustom03" required onChange={e => setDob(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom04">Email</CFormLabel>
                  <CFormInput type="text" id="validationCustom04" required onChange={e => setEmail(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom05">Phone</CFormLabel>
                  <CFormInput type="text" id="validationCustom05" required onChange={e => setPhone(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom06">Address</CFormLabel>
                  <CFormInput type="text" id="validationCustom06" required onChange={e => setAddress(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom07">Food allergies</CFormLabel>
                  <CFormInput type="text" id="validationCustom07" required onChange={e => setFoodAllergies(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                {/* <div style={{ margin: '20px 0px', fontWeight: '900' }}>
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
                </CCol> */}

              </CForm>

            </CCardBody>

            {/* <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
              <CSpinner color='primary' variant='grow' />
            </CCardBody> */}

          </CCard>
        </CCol>
      </CRow >
    </>
  )
}

export default withAuthenticationRequired(CreateClient)