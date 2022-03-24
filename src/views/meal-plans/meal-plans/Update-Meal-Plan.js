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
import { restApiGet, restApiPut } from 'src/api_calls/rest';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';
import { CFoodPreference } from 'src/views/clients/clients/food-preferences/CFoodPreference';
import { cidFileAdd, cilEye, cilInfoCircle } from '@coreui/icons-pro';
import { useSelector, useDispatch } from 'react-redux'
import { AppAside } from 'src/components';
import { CFoodCombination } from '../food-combinations/CFoodCombination';
import { Route } from 'react-router-dom';
import { SwalMixin } from 'src/components/SweetAlerts/Swal';
import { INITIAL_DAYS } from '../food-combinations/INITIAL_DAYS';

function calculateAge(birthday) { // birthday is a date
  var dob = new Date(birthday);
  var ageDifMs = Date.now() - dob.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const UpdateMealPlan = (props) => {
  let today = new Date();
  today.getDate();
  const asideShow = useSelector(state => state.asideShow) // Display Clients Info
  const dispatch = useDispatch()

  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cannot USE SET BECAUSE TWO API CALLS ARE INVOKED!!!
  var updatedBasicInfo = "";
  var updatedFoodCombinations = "";

  const [client, setClient] = useState([]);
  const [date, setDate] = useState(FormatTimestampFunction(today));
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("N/A");

  const [food_combination, setFoodCombination] = useState([])
  const [selectedDay, setSelectedDay] = useState("Monday")

  const parameters = new URLSearchParams(props.location.search);

  var id = (parameters.get('id') ? (parameters.get('id')) : "");;

  const [client_id, setClientID] = useState(parameters.get('id') ? (parameters.get('id')) : "");
  const [meal_plan_id, setMealPlanID] = useState(parameters.get('meal_plan_id') ? (parameters.get('meal_plan_id')) : "");

  var record_id = Math.floor(Math.random() * 99999);

  // Get Client's Info
  React.useEffect(() => {
    setLoading(true);

    Promise.resolve(
      restApiGet(mainUrl + '/clients/' + client_id)
        .then(function (value) {
          if (client_id) {
            setClient(value);
            setAge(calculateAge(value.dob));
          }
          setLoading(false);
        }));

    Promise.resolve(
      restApiGet(mainUrl + '/meal-plans/' + client_id)
        .then(function (meal_value) {
          if (meal_value) {
            setDate(FormatTimestampFunction(meal_value.date));
            setWeight(meal_value.weight);
            setNotes(meal_value.notes);
          }
          setLoading(false);
        }));
  }, []);

  async function GetFoodCombinations(day) {
    if (meal_plan_id) {
      setLoading(true);
      Promise.resolve(
        restApiGet(mainUrl + '/meal-plans/food-combinations/' + meal_plan_id + '/' + day)
          .then(function (value) {
            setFoodCombination(value);
            setLoading(false);
          }));
    }
  }

  // Get-Set Food Combination
  React.useEffect(() => {
    if (meal_plan_id) {
      setLoading(true);
      Promise.resolve(
        restApiGet(mainUrl + '/meal-plans/food-combinations/' + meal_plan_id + '/' + selectedDay)
          .then(function (value) {
            setFoodCombination(value);
            setLoading(false);
          }));
    }
  }, []);

  // Reset Food Combinations on Delete
  const resetData = () => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/meal-plans/food-combinations/' + meal_plan_id)
        .then(function (value) {
          setFoodCombination(value);
          setLoading(false);
        }));
  }

  const handleSubmitBasicInfo = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      updatedBasicInfo = {
        client_id: id,
        client_first_name: client.first_name,
        client_last_name: client.last_name,
        date: date,
        age: age,
        weight: weight,
        notes: notes,
      };

      setLoading(true);

      // Update meal plan
      Promise.resolve(
        restApiPut(mainUrl + '/meal-plans/update/', updatedBasicInfo, true)
          .then(function (value) {
            setMealPlanID(value.meal_plan.id);
            setLoading(false);
          }).catch(function () {
            setLoading(false);
          }));
    }
    setValidated(true)
  }

  const handleCreateFoodCombination = () => {
    let today = new Date();
    today.getDate();
    let newFoodCombination = { id: record_id, meal_plan_id: meal_plan_id, title: "", portion: "", start: "", end: "", typeOfMeal: "Breakfast", day: selectedDay }
    let newArray = []
    newArray.push(newFoodCombination, ...food_combination);

    setFoodCombination(newArray);
  }

  const handleChangeDay = (e) => {
    setSelectedDay(e.target.value);
    let day = e.target.value;
    GetFoodCombinations(day);
  }

  const handleUpdateFoodCombination = (i, e) => {
    let newFormValues = [...food_combination];
    console.log(newFormValues);
    newFormValues[i][e.target.name] = e.target.value;
    setFoodCombination(newFormValues);
  }

  const handleSubmitFoodCombination = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      updatedFoodCombinations = food_combination;

      setLoading(true);

      // Update food combinations
      {
        updatedFoodCombinations.map((record, index) => {
          Promise.resolve(
            restApiPut(mainUrl + '/meal-plans/food-combinations/update/' + parseInt(record.id), record, true)
              .then(function (value) {
                setLoading(false);
              }));
        })
      }
    }
    setValidated(true)
  }

  try {
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <CSpinner color='dark' className="me-1 float-end" style={{ display: (loading) ? "block" : "none" }} variant='grow' />
                <strong>{(meal_plan_id) ? 'Update' : 'Create'} Meal Plan</strong>


                <Route render={({ history }) => (
                  <CButton
                    style={{ display: (client_id && meal_plan_id) ? 'block' : 'none' }}
                    className="me-1 float-end"
                    size="sm"
                    color='primary'
                    variant="ghost"
                    onClick={() => {
                      (client_id && meal_plan_id) ? history.push({
                        pathname: "/meal-plans/view-meal-plan", search: '?id=' + client_id + '&meal_plan_id=' + meal_plan_id
                      }) :
                        (SwalMixin('info', 'No meal plan found!'))
                    }}
                  ><CIcon icon={cilEye} /> View
                  </CButton>
                )} />

                <CButton
                  disabled={loading}
                  className="me-1 float-end"
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={(e) => handleSubmitBasicInfo(e)}
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
                      value={date}
                      onChange={e => setDate(e.target.value)} />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationCustom05">Weight</CFormLabel>
                    <CFormInput type="number" id="validationCustom05" required
                      value={weight}
                      onChange={e => setWeight(e.target.value)} />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="validationCustom06">Notes</CFormLabel>
                    <CFormInput type="text" id="validationCustom06" required
                      value={notes}
                      onChange={e => setNotes(e.target.value)} />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                  </CCol>

                  <CButton
                    disabled={loading}
                    className="me-1 float-end"
                    size="sm"
                    color='success'
                    variant="ghost"
                    onClick={handleSubmitBasicInfo}
                  ><CIcon icon={cilSave} /> Save Info
                  </CButton>

                </CForm>
              </CCardBody>

              <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
                <CSpinner color='dark' variant='grow' />
              </CCardBody>

            </CCard>

            <div style={{ display: (id) ? "block" : "none" }}>

              <div style={{ margin: '20px 0px', fontWeight: '900' }}>
                Food Preferences
              </div>

              <CCard>
                <CCardBody style={{ display: (loading) ? 'none' : 'block' }}>
                  <CFoodPreference client_id={id} />
                </CCardBody>
                <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
                  <CSpinner color='dark' variant='grow' />
                </CCardBody>
              </CCard>

            </div>

            <div style={{ margin: '20px 0px', fontWeight: '900' }}>
              Food Combinations
            </div>

            <CCard>
              <CCardBody style={{ display: (loading) ? 'none' : 'block' }}>

                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                >

                  <CCardHeader>
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel className="me-1" htmlFor="validationCustom06">Select Day</CFormLabel>
                        <CFormSelect name="typeOfMeal" id="validationCustom06" required
                          disabled={(meal_plan_id) ? false : true}
                          className="me-1"
                          options={INITIAL_DAYS}
                          defaultValue='Monday'
                          value={selectedDay}
                          onChange={handleChangeDay}
                        />
                        <CFormFeedback className="me-1" valid>Looks good!</CFormFeedback>
                      </CCol>

                      <CCol md={6}>
                        <CButton
                          disabled={(meal_plan_id) ? false : true}
                          className="me-1 float-end"
                          size="sm"
                          color='info'
                          variant="ghost"
                          onClick={(handleCreateFoodCombination)}
                        ><CIcon icon={cidFileAdd} /> Create Food Combinations
                        </CButton>
                      </CCol>
                    </CRow>

                  </CCardHeader>

                  {food_combination.map((item, index) =>
                    <div key={index}>
                      <CFoodCombination item={item} index={index}
                        handleUpdateFoodCombination={handleUpdateFoodCombination}
                        handleSubmitFoodCombination={handleSubmitFoodCombination}
                        resetData={resetData}
                      />
                    </div>
                  )}

                  <CButton
                    disabled={(meal_plan_id) ? false : true}
                    className="me-1"
                    size="sm"
                    color='success'
                    variant="ghost"
                    onClick={handleSubmitFoodCombination}
                  ><CIcon icon={cilSave} /> Save All Records
                  </CButton>
                </CForm>

              </CCardBody>


              <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
                <CSpinner color='dark' variant='grow' />
              </CCardBody>

            </CCard>

          </CCol>
        </CRow >

        <div style={{ display: (id) ? "block" : "none", position: 'fixed', bottom: '50px', right: '30px' }}>
          <CButton
            shape={'rounded-pill'}
            color='primary'
            size='lg'
            onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}>
            <CIcon icon={cilInfoCircle} size='lg' />
          </CButton>
        </div>

        <div style={{ display: (id) ? "block" : "none" }}>
          <AppAside client_id={id} />
        </div>
      </>
    )
  } catch (e) {
    console.error(e);
    return ("");
  }
}

export default withAuthenticationRequired(UpdateMealPlan)