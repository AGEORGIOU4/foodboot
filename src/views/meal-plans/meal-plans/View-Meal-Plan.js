import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { CCol, CSpinner, CCard, CCardBody, CRow, CImage, CCardHeader, CButton, CBadge, CFormSelect, CFormFeedback, CFormLabel } from '@coreui/react-pro'
import { FormatTimestamp, mainUrl } from 'src/components/Common';
import { restApiGet } from 'src/api_calls/rest';
import CIcon from '@coreui/icons-react';
import { cilPrint, cilScale } from '@coreui/icons-pro';
import { cilFullscreen, cilPencil, cilZoomIn, cilZoomOut } from '@coreui/icons';
import { Route } from 'react-router-dom';
import { FoodCombinationsViewTable } from '../food-combinations/FoodCombinationsViewTable';
import { INITIAL_DAYS } from '../food-combinations/INITIAL_DAYS';

const print = (e) => {
  e.preventDefault()
  window.print()
}

var zoom = 60;

const ViewMealPlan = (props) => {
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState("");
  const [mealPlan, setMealPlan] = useState([]);
  const [foodCombinations, setFoodCombinations] = useState([]);

  const [selectedDay, setSelectedDay] = useState('Monday');

  const parameters = new URLSearchParams(props.location.search);
  const client_id = parameters.get('id');
  const meal_plan_id = parameters.get('meal_plan_id');

  const [zoomText, setZoomText] = useState(zoom);

  function ZoomIn() {
    zoom += 10;
    document.getElementById('meal-plan-card').style.zoom = zoom + '%';
    setZoomText(zoom);
  }

  function ZoomOut() {
    zoom -= 10;
    document.getElementById('meal-plan-card').style.zoom = zoom + '%';
    setZoomText(zoom);
  }

  function SetDefaultZoom() {
    zoom = 60;
    document.getElementById('meal-plan-card').style.zoom = zoom + '%';
    setZoomText(zoom);
  }

  function promptPrint(e) {
    zoom = 60;

    document.getElementById('meal-plan-card').style.zoom = zoom + '%';
    setTimeout(() => { print(e) }, 100);
    setZoomText(zoom);
  }

  const handleChangeDay = (e) => {
    setSelectedDay(e.target.value);
  }

  // Set Client
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/' + client_id)
        .then(function (value) {
          setClient(value);
          setLoading(false);
        }));
  }, []);

  // Set Meal Plan
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/meal-plans/' + client_id)
        .then(function (value) {
          setMealPlan(value);
          setLoading(false);
        }));
  }, []);

  // Set Food Combinations
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/meal-plans/food-combinations/' + meal_plan_id)
        .then(function (value) {
          setFoodCombinations(value);
          setLoading(false);
        }));
  }, []);

  return (
    <>
      <CCard id='meal-plan-card' style={{ zoom: zoom + '%' }}>


        <CCardHeader>
          <CRow>
            <CCol md={3}>

              <CFormSelect name="typeOfMeal" id="validationCustom06" required
                className="me-1"
                options={INITIAL_DAYS}
                defaultValue='Monday'
                value={selectedDay}
                onChange={handleChangeDay}
              />
              <CFormFeedback className="me-1" valid>Looks good!</CFormFeedback>
            </CCol>

            <CCol md={9}>
              <Route render={({ history }) => (
                <CButton
                  className="me-1 float-end"
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={() => { history.push({ pathname: "/meal-plans/update-meal-plan", search: '?id=' + client_id + '&meal_plan_id=' + meal_plan_id }) }}
                ><CIcon icon={cilPencil} /> Edit
                </CButton>
              )} />

              <CButton
                className="me-1 float-end"
                size="sm"
                color='secondary'
                variant="ghost"
                onClick={promptPrint}
              >
                <CIcon icon={cilPrint} /> Print
              </CButton>

              <CButton
                className="me-1 float-end"
                size="sm"
                color='primary'
                variant="ghost"
                onClick={SetDefaultZoom}
              ><CIcon icon={cilFullscreen} /></CButton>
              <CButton
                className="me-1 float-end"
                size="sm"
                color='primary'
                variant="ghost"
                onClick={ZoomIn}
              ><CIcon icon={cilZoomIn} /></CButton>

              <CButton
                className="me-1 float-end"
                size="sm"
                color='primary'
                variant="ghost"
                onClick={ZoomOut}
              ><CIcon icon={cilZoomOut} /></CButton>

              <CBadge className="me-1 float-end"
                color={'primary'}>{zoomText} %</CBadge>

            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody style={{ display: (loading) ? 'none' : 'block', padding: '40px' }}>
          <div>
            <CRow>
              <CCol md={4}>
                <strong>MEAL PLANNING</strong>
                <br />
                <em>for Clients</em>
                <br />
                <br />
                <strong>Date</strong>
                <br />
                <FormatTimestamp date={mealPlan.date} />
                <br />
                <br />
                <br />
                <h1>{selectedDay}</h1>
              </CCol>

              <CCol md={4} style={{ textAlign: 'center' }}>
                <CImage id='logo-img' width={zoom * 4} src={'foodboot-logo-landscape.png'} />
              </CCol>

              <CCol md={4} style={{ textAlign: 'end' }}>
                <strong>NAME</strong>
                <br />
                {client.first_name} {client.last_name}
                <br />
                <br />
                <strong>AGE: </strong> {mealPlan.age}
                <br />
                <strong>WEIGHT (kg): </strong> {mealPlan.weight}
                <br />
                <strong>NOTES: </strong> {mealPlan.notes}
              </CCol>

              <hr style={{ margin: '30px 0' }} />
            </CRow>
          </div>

          {/* Breakfast */}
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Breakfast'} color={'success'} typeOfMeal={'Breakfast'} day={selectedDay} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Morning Snack'} color={'info'} typeOfMeal={'Morning Snack'} day={selectedDay} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Lunch'} color={'warning'} typeOfMeal={'Lunch'} day={selectedDay} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Afternoon Snack'} color={'primary'} typeOfMeal={'Afternoon Snack'} day={selectedDay} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Dinner'} color={'danger'} typeOfMeal={'Dinner'} day={selectedDay} />


        </CCardBody>

        <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
          <CSpinner color='dark' variant='grow' />
        </CCardBody>

      </CCard>

      <CCard>
        <CCardBody>
        </CCardBody>
      </CCard>
    </>
  )
}

export default withAuthenticationRequired(ViewMealPlan)