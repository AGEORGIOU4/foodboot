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
  CFormSelect,
} from '@coreui/react-pro'
import { FormatTimestampFunction, mainUrl } from 'src/components/Common';
import { restApiGet, restApiPost, restApiPut } from 'src/api_calls/rest';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';

const CreateMealPlan = (props) => {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(true)

  const parameters = new URLSearchParams(props.location.search);
  const [client_id, setClientID] = useState(parameters.get('id'));

  var createdData = "";

  let today = new Date();
  today.getDate();

  const [clients, setClients] = useState([]);
  const [selected_client, setSelectedClient] = useState("");

  const [client, setClient] = useState([]);
  const [date, setDate] = useState(today);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("N/A");


  // Set Clients || Client
  React.useEffect(() => {
    setLoading(true);
    let url = (!client_id) ? (mainUrl.concat('/clients/')) : (mainUrl.concat('/clients/')).concat(client_id);

    Promise.resolve(
      restApiGet(url)
        .then(function (value) {
          if (client_id) {
            setClient(value);
            setAge(calculateAge(value.dob));
          } else {
            let arr = [...[{ id: "", first_name: "", last_name: "", email: "Select Client" }], ...value];
            arr.map(item => item['label'] = (item.first_name) ? (item.first_name + ' ' + item.last_name) : (item.email))
            arr.map(item => item['value'] = item.id);

            setClients(arr);
          }
          setLoading(false);
        }));
  }, []);

  function calculateAge(birthday) { // birthday is a date
    var dob = new Date(birthday);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function handleChange(e) {
    setSelectedClient(e.target.value);
    setClientID(e.target.value);

    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/' + e.target.value)
        .then(function (value) {
          setClient(value);
          setAge(calculateAge(value.dob));
          setLoading(false);
        }));
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      createdData = {
        client_id: client_id,
        client_first_name: client.first_name,
        client_last_name: client.last_name,
        date: date,
        age: age,
        weight: weight,
        notes: notes,
      };

      setLoading(true);

      // Create meal plan
      Promise.resolve(
        restApiPut(mainUrl + '/meal-plans/update/', createdData, true)
          .then(function (value) {
            setLoading(false);
          }).catch(function () {
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
              <CSpinner color='dark' className="me-1 float-end" style={{ display: (loading) ? "block" : "none" }} variant='grow' />
              <strong>Create Meal Plan</strong>
              <CButton
                disabled={loading}
                className="me-1 float-end"
                size="sm"
                color='success'
                variant="ghost"
                onClick={(e) => handleSubmit(e)}
              ><CIcon icon={cilSave} /> Save
              </CButton>
            </CCardHeader>

            <CCardBody style={{ display: (loading) ? 'none' : 'block' }}>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
              >
                <CCol md={4} style={{ display: (client_id) ? "block" : "none" }}>
                  <CFormLabel htmlFor="validationCustom01">Client</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" required disabled
                    value={client.first_name + ' ' + client.last_name} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={4} style={{ display: (!client_id) ? "block" : "none" }}>
                  <CFormLabel htmlFor="validationCustom01">Client</CFormLabel>
                  <CFormSelect
                    value={selected_client}
                    onChange={handleChange}
                    options={clients} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" disabled
                    value={client.email} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom03">Age</CFormLabel>
                  <CFormInput type="number" id="validationCustom03" required disabled
                    value={age}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom04">Date</CFormLabel>
                  <CFormInput type="date" id="validationCustom04" required
                    onChange={e => setDate(e.target.value)}
                    value={FormatTimestampFunction(today)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom05">Weight</CFormLabel>
                  <CFormInput type="number" id="validationCustom05" required
                    onChange={e => setWeight(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom06">Notes</CFormLabel>
                  <CFormInput type="text" id="validationCustom06" value={notes} required onChange={e => setNotes(e.target.value)} />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CButton
                  disabled={loading}
                  className="me-1 float-end"
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={handleSubmit}
                ><CIcon icon={cilSave} /> Save Meal Plan
                </CButton>

                <hr />

              </CForm>

            </CCardBody>

            <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
              <CSpinner color='dark' variant='grow' />
            </CCardBody>

          </CCard>
        </CCol>
      </CRow >
    </>
  )
}

export default withAuthenticationRequired(CreateMealPlan)