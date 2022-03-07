import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CSpinner,
} from '@coreui/react-pro'
import axios from 'axios';
import { SwalMixin } from 'src/components/SwalMixin';
import { customersUrl } from 'src/components/Common';

const CreateCustomer = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      setLoading(true);

      axios.post(customersUrl + '/customers/create', {
        "name": name,
        "surname": surname,
        "email": email,
        "phone": phone,
        "dob": dob
      })
        .then(function (response) {
          console.log(response);
          SwalMixin('success', 'Added!');
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error.response.data);
          SwalMixin('error', error.response.data.error);
          setLoading(false);
        });
    }
    setValidated(true)
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
    >
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Name</CFormLabel>
        <CFormInput type="text" id="validationCustom01" required onChange={e => setName(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Surname</CFormLabel>
        <CFormInput type="text" id="validationCustom02" required onChange={e => setSurname(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom03">Email</CFormLabel>
        <CFormInput type="text" id="validationCustom03" required onChange={e => setEmail(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom04">Phone</CFormLabel>
        <CFormInput type="text" id="validationCustom04" required onChange={e => setPhone(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom05">DOB</CFormLabel>
        <CFormInput type="date" id="validationCustom05" required onChange={e => setDob(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>

      <CCol xs={6}>
        <CSpinner style={{ position: "absolute", margin: "4px 0px 0 20px", display: (loading) ? "block" : "none" }} color='primary' variant='grow' />
        <CButton disabled={loading} color="success" type="button" onClick={handleSubmit}>
          Create
        </CButton>
      </CCol>
    </CForm>
  )
}


export default CreateCustomer
