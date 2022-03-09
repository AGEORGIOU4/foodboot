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
} from '@coreui/react-pro'
import { FormatTimestampFunction, mainUrl } from 'src/components/Common';
import { restApiPut } from 'src/components/apiCalls/rest';

const EditClient = (props) => {
  var client = "";

  if (props.location.state) {
    client = props.location.state;
    console.log(client);
  }

  const [id, setID] = useState(client.id);
  const [name, setName] = useState(client.name);
  const [surname, setSurname] = useState(client.surname);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [dob, setDob] = useState(FormatTimestampFunction(client.dob));

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      client = {
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        dob: dob
      }

      setLoading(true);
      Promise.resolve(
        restApiPut(mainUrl + '/clients/update/' + id, client)
          .then(function (value) {
            setLoading(false);
          }));
    }
    setValidated(true)
  }

  return (
    <>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
      >
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
          <CFormInput type="text" id="validationCustom01" value={name} required onChange={e => setName(e.target.value)} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom02">Surname</CFormLabel>
          <CFormInput type="text" id="validationCustom02" value={surname} required onChange={e => setSurname(e.target.value)} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom03">Email</CFormLabel>
          <CFormInput type="text" id="validationCustom03" value={email} required onChange={e => setEmail(e.target.value)} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom04">Phone</CFormLabel>
          <CFormInput type="text" id="validationCustom04" value={phone} required onChange={e => setPhone(e.target.value)} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="validationCustom05">DOB</CFormLabel>
          <CFormInput type="date" id="validationCustom05" value={dob} required onChange={e => setDob(e.target.value)} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>

        <div style={{ width: "100%" }}>
          <hr></hr>
        </div>

        <CCol md={12} style={{ textAlign: 'end' }}>
          <CSpinner style={{ position: "absolute", margin: "4px 0px 0 20px", display: (loading) ? "block" : "none" }} color='primary' variant='grow' />
          <CButton disabled={loading} color="success" type="button" onClick={handleSubmit}>
            Update
          </CButton>

        </CCol>
      </CForm>
    </>
  )
}

export default withAuthenticationRequired(EditClient)