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
import { restApiGet, restApiPost, restApiPut } from 'src/components/apiCalls/rest';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';
import { cidFileAdd } from '@coreui/icons-pro';
import { CMedicalRecord } from './medical-histories/CMedicalRecord';

const CreateClient = (props) => {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  var createdBasicInfo = "";
  var createdMedicalRecords = "";

  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [food_allergies, setFoodAllergies] = useState();

  const [medical_history, setMedicalHistory] = useState([])

  // Obtsained after creation
  const [client_id, setClientID] = useState()

  var record_id = Math.floor(Math.random() * 99999);

  // Reset Medical Histories on Delete
  const resetData = () => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/medical-histories/' + client_id)
        .then(function (value) {
          setMedicalHistory(value);
          setLoading(false);
        }));
  }

  const handleSubmitBasicInfo = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      createdBasicInfo = {
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        email: email,
        phone: phone,
        address: address,
        food_allergies: food_allergies
      };

      setLoading(true);

      // Create client
      Promise.resolve(
        restApiPost(mainUrl + '/clients/create/', createdBasicInfo, true)
          .then(function (value) {
            setLoading(false);
            setClientID(value.client.id);
          }).catch(function () {
            setLoading(false);
          }));
    }
    setValidated(true)
  }

  const handleCreateMedicalRecord = () => {
    let today = new Date();
    today.getDate();
    let newMedicalRecord = { id: record_id, client_id: client_id, date: today, height: "", weight: "" }
    let newArray = []
    newArray.push(newMedicalRecord, ...medical_history);

    setMedicalHistory(newArray);
  }

  const handleUpdateMedicalHistory = (i, e) => {
    let newFormValues = [...medical_history];
    newFormValues[i][e.target.name] = e.target.value;
    setMedicalHistory(newFormValues);
  }

  const handleSubmitMedicalHistory = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {

      createdMedicalRecords = medical_history;

      setLoading(true);

      // Update medical records
      {
        createdMedicalRecords.map((record, index) => {
          Promise.resolve(
            restApiPut(mainUrl + '/clients/medical-histories/update/' + parseInt(record.id), record, true)
              .then(function (value) {
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
              <strong>Create Client</strong>
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

                <div>
                  <CButton
                    disabled={(client_id) ? false : true}
                    className="me-1 float-end"
                    size="sm"
                    color='info'
                    variant="ghost"
                    onClick={handleCreateMedicalRecord}
                  ><CIcon icon={cidFileAdd} /> Create Medical Record
                  </CButton>
                </div>

                {medical_history.map((item, index) =>
                  <div key={index}>
                    <CMedicalRecord item={item} index={index}
                      handleUpdateMedicalHistory={handleUpdateMedicalHistory}
                      handleSubmitMedicalHistory={handleSubmitMedicalHistory}
                      resetData={resetData}
                    />
                  </div>
                )}

                <CButton
                  disabled={(client_id) ? false : true}
                  className="me-1"
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={(e) => handleSubmitMedicalHistory(e)}
                ><CIcon icon={cilSave} /> Save All Records
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

export default withAuthenticationRequired(CreateClient)