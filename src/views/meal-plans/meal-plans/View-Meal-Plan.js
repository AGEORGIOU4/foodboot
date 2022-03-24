import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { CCol, CFormLabel, CSpinner, CCard, CCardBody, CRow, CImage, CCardHeader, CButton, CBadge } from '@coreui/react-pro'
import avatar from '../../../assets/images/avatars/avatar.png'
import { FormatTimestamp, mainUrl } from 'src/components/Common';
import { restApiGet } from 'src/api_calls/rest';
import CIcon from '@coreui/icons-react';
import { cilPrint } from '@coreui/icons-pro';
import { cilPencil, cilZoomIn, cilZoomOut } from '@coreui/icons';
import { Route } from 'react-router-dom';
import { FoodCombinationsViewTable } from '../food-combinations/FoodCombinationsViewTable';

const print = (e) => {
  e.preventDefault()
  window.print()
}

var zoom = 100;

const ViewMealPlan = (props) => {
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState("");
  const [mealPlan, setMealPlan] = useState([]);
  const [foodCombinations, setFoodCombinations] = useState([]);

  const parameters = new URLSearchParams(props.location.search);
  const client_id = parameters.get('id');
  const meal_plan_id = parameters.get('meal_plan_id');

  const [zoomText, setZoomText] = useState(zoom);

  function ZoomIn() {
    zoom += 10;
    document.getElementById('meal-plan-card').style.zoom = zoom + '%';
    document.getElementById('logo-img').style.width = '100%';
    setZoomText(zoom);
  }

  function ZoomOut() {
    zoom -= 10;
    document.getElementById('meal-plan-card').style.zoom = zoom + '%';
    document.getElementById('logo-img').style.width = '100%';
    setZoomText(zoom);
  }

  function promptPrint(e) {
    zoom = 70;

    document.getElementById('meal-plan-card').style.zoom = zoom + '%';
    document.getElementById('logo-img').style.width = '20%';
    setTimeout(() => { print(e) }, 100);
    setZoomText(zoom);
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
      <CCard id='meal-plan-card'>
        <CCardHeader>

          <CButton
            className="me-1"
            size="sm"
            color='primary'
            variant="ghost"
            onClick={ZoomIn}
          ><CIcon icon={cilZoomIn} /></CButton>

          <CButton
            className="me-1"
            size="sm"
            color='primary'
            variant="ghost"
            onClick={ZoomOut}
          ><CIcon icon={cilZoomOut} /></CButton>

          <CBadge color={'primary'}>{zoomText} %</CBadge>

          <CButton
            className="me-1 float-end"
            size="sm"
            color='secondary'
            variant="ghost"
            onClick={promptPrint}
          >
            <CIcon icon={cilPrint} /> Print
          </CButton>

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
              </CCol>

              <CCol md={4} style={{ textAlign: 'center' }}>
                <CImage id='logo-img' width={'100%'} src={'foodboot-logo-landscape.png'} />
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
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Breakfast'} color={'success'} typeOfMeal={'Breakfast'} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Morning Snack'} color={'info'} typeOfMeal={'Morning Snack'} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Lunch'} color={'warning'} typeOfMeal={'Lunch'} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Afternoon Snack'} color={'primary'} typeOfMeal={'Afternoon Snack'} />
          <FoodCombinationsViewTable data={foodCombinations} loading={loading} title={'Dinner'} color={'danger'} typeOfMeal={'Dinner'} />


        </CCardBody>


        <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
          <CSpinner color='dark' variant='grow' />
        </CCardBody>

      </CCard>
    </>
  )
}

export default withAuthenticationRequired(ViewMealPlan)