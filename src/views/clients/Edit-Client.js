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
import { FormatTimestampFunction, FormatTimestampFunction2, mainUrl } from 'src/components/Common';
import { restApiGet, restApiPut } from 'src/components/apiCalls/rest';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';
import { SwalMixin } from 'src/components/SweetAlerts/Swal';

const EditClient = (props) => {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const [medical_history, setMedicalHistory] = useState([])

  var updatedBasicInfo = "";
  var updatedMedicalRecords = "";

  const parameters = new URLSearchParams(props.location.search);
  const client_id = parameters.get('id');

  // Get Client/Medical History
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/' + client_id)
        .then(function (value) {
          handleBasicInfo(value);
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

  const [first_name, setFirstName] = useState(updatedBasicInfo.first_name);
  const [last_name, setLastName] = useState(updatedBasicInfo.last_name);
  const [dob, setDob] = useState(FormatTimestampFunction(updatedBasicInfo.dob));
  const [email, setEmail] = useState(updatedBasicInfo.email);
  const [phone, setPhone] = useState(updatedBasicInfo.phone);
  const [address, setAddress] = useState(updatedBasicInfo.address);
  const [food_allergies, setFoodAllergies] = useState(updatedBasicInfo.food_allergies);

  let handleBasicInfo = (data) => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setDob(FormatTimestampFunction(data.dob));
    setEmail(data.email);
    setPhone(data.phone);
    setAddress(data.address);
    setFoodAllergies(data.food_allergies);
  }

  let handleMedicalHistory = (i, e) => {
    let newFormValues = [...medical_history];
    newFormValues[i][e.target.name] = e.target.value;
    setMedicalHistory(newFormValues);
  }

  const handleSubmitBasicInfo = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {

      updatedBasicInfo = {
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        email: email,
        phone: phone,
        address: address,
        food_allergies: food_allergies
      };

      setLoading(true);

      // Update client
      Promise.resolve(
        restApiPut(mainUrl + '/clients/update/' + client_id, updatedBasicInfo, true, 'Basic Information updated!')
          .then(function (value) {
            setLoading(false);
          }).catch(function () {
            setLoading(false);
          }));
    }
    setValidated(true)
  }

  const handleSubmitMedicalHistory = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {

      updatedMedicalRecords = medical_history;

      setLoading(true);

      // Update medical records
      {
        updatedMedicalRecords.map((record, index) => {
          Promise.resolve(
            restApiPut(mainUrl + '/clients/medical-histories/update/' + parseInt(record.id), record, false)
              .then(function (value) {
                if (index === (updatedMedicalRecords.length - 1)) {
                  SwalMixin('success', 'Medical Records updated!')
                }
                setLoading(false);
              }));
        })
      }

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
            </CCardHeader>
            <CCardBody style={{ display: (loading) ? "none" : "block" }}>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
              >
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">First name</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" value={first_name} required
                    onChange={e => setFirstName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Last name</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" value={last_name} required
                    onChange={e => setLastName(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom03">DOB</CFormLabel>
                  <CFormInput type="date" id="validationCustom03" value={(dob)} required
                    onChange={e => setDob(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom04">Email</CFormLabel>
                  <CFormInput type="text" id="validationCustom04" value={email} required
                    onChange={e => setEmail(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom05">Phone</CFormLabel>
                  <CFormInput type="text" id="validationCustom05" value={phone} required
                    onChange={e => setPhone(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom06">Address</CFormLabel>
                  <CFormInput type="text" id="validationCustom06" value={address} required
                    onChange={e => setAddress(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom07">Food allergies</CFormLabel>
                  <CFormInput type="text" id="validationCustom07" value={food_allergies} required
                    onChange={e => setFoodAllergies(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CButton
                  disabled={loading}
                  className="me-1 float-end"
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={handleSubmitBasicInfo}
                ><CIcon icon={cilSave} /> Save
                </CButton>

                <hr />

                <div style={{ margin: '20px 0px', fontWeight: '900' }}>
                  Medical History
                </div>

                {medical_history.map((item, index) =>
                  <div key={index}>
                    <CRow>
                      <CCol md={4}>
                        <CFormLabel htmlFor="validationCustom08">Date Updated</CFormLabel>
                        <CFormInput type="date" name="date" id="validationCustom08" required
                          value={FormatTimestampFunction(item.date) || ""}
                          onChange={e => handleMedicalHistory(index, e)} />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                      </CCol>
                      <CCol md={4}>
                        <CFormLabel htmlFor="validationCustom09">Height</CFormLabel>
                        <CFormInput type="text" name="height" id="validationCustom09" required
                          value={item.height}
                          onChange={e => handleMedicalHistory(index, e)} />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                      </CCol>
                      <CCol md={4}>
                        <CFormLabel htmlFor="validationCustom10">Weight</CFormLabel>
                        <CFormInput type="text" name="weight" id="validationCustom10" required
                          value={item.weight}
                          onChange={e => handleMedicalHistory(index, e)} />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                      </CCol>
                    </CRow>
                  </div>

                )}

                <CButton
                  disabled={loading}
                  className="me-1 float-end"
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={handleSubmitMedicalHistory}
                ><CIcon icon={cilSave} /> Save
                </CButton>
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