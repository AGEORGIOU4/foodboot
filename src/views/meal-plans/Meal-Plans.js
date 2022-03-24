import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CButton, CCard, CCardBody, CCardHeader, CFormSelect, CSpinner } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react';
import { mainUrl } from 'src/components/Common';
import { restApiGet } from 'src/api_calls/rest';
import { cidNoteAdd, cilEye, cisNoteAdd } from '@coreui/icons-pro';
import { Route } from 'react-router-dom';
import MealPlansTable from './MealPlansTable';
import { SwalMixin } from 'src/components/SweetAlerts/Swal';

const MealPlans = () => {
  const [clients, setClients] = useState([]);
  const [meal_plans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [client_id, setClientID] = useState("");
  const [selected_client, setSelectedClient] = useState("");
  const [meal_plan_id, setMealPlanID] = useState("");

  const [mealPlanFlag, setMealPlanFlag] = useState(false);

  // Set Clients
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/order')
        .then(function (value) {
          let arr = [...[{ id: "", first_name: "", last_name: "", email: "Select Client" }], ...value];
          arr.map(item => item['label'] = (item.first_name) ? (item.last_name + ' ' + item.first_name + ' | ' + item.email) : (item.email))
          arr.map(item => item['value'] = item.id);

          setClients(arr);
          setLoading(false);
        }));
  }, []);

  // Set Meal Plans
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/meal-plans')
        .then(function (value) {
          setMealPlans(value);
          setLoading(false);
        }));
  }, []);

  function handleChange(e) {
    setClientID(e.target.value);
    setSelectedClient(e.target.value);
    getMealPlan(e.target.value);
  }

  function getMealPlan(client_id) {
    Promise.resolve(
      restApiGet(mainUrl + '/meal-plans/' + client_id, false)
        .then(function (value) {
          if (value) {
            setMealPlanID(value.id);
            setMealPlanFlag(true);
          } else {
            setMealPlanFlag(false);
          }
        }));
  }

  function resetData() {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/meal-plans')
        .then(function (value) {
          setMealPlans(value);
          setLoading(false);
        }));
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Select Client</strong>

          <Route render={({ history }) => (
            <CButton
              style={{ display: (mealPlanFlag) ? 'block' : 'none' }}
              className="me-1 float-end"
              size="sm"
              color='primary'
              variant="ghost"
              onClick={() => {
                (client_id && client_id !== 'Select Client') ? history.push({
                  pathname: "/meal-plans/view-meal-plan", search: '?id=' + client_id + '&meal_plan_id=' + meal_plan_id
                }) :
                  (SwalMixin('info', 'Select Client!'))
              }}
            ><CIcon icon={cilEye} /> View
            </CButton>
          )} />

          <Route render={({ history }) => (
            <CButton
              className="me-1 float-end"
              size="sm"
              color='info'
              variant="ghost"
              onClick={() => {
                (client_id && client_id !== 'Select Client') ? history.push({
                  pathname: "/meal-plans/update-meal-plan", search: '?id=' + client_id + '&meal_plan_id=' + meal_plan_id
                }) :
                  (SwalMixin('info', 'Select Client!'))
              }}
            ><CIcon icon={cisNoteAdd} /> {(mealPlanFlag) ? 'Edit Meal Plan' : 'Create Meal Plan'}
            </CButton>
          )} />

        </CCardHeader>
        <CCardBody style={{ display: (loading) ? 'none' : 'block' }}>
          <CFormSelect
            required
            value={selected_client}
            onChange={handleChange}
            options={clients} />
        </CCardBody>
        <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
          <CSpinner color='dark' variant='grow' />
        </CCardBody>
      </CCard >

      <div style={{ margin: '20px 0px', fontWeight: '900' }}>
        Meal Plans
      </div>
      <MealPlansTable data={meal_plans} loading={loading} resetData={resetData} style={{ display: (loading) ? 'none' : 'block' }} />
    </>
  )
}

export default withAuthenticationRequired(MealPlans)