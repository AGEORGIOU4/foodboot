import React, { useState } from 'react'
import { CRow, CButton, CContainer, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from "@coreui/react-pro";

export function CalculateBMI(weight, height) {
  var bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
  return 'Body Mass Index: ' + bmi;
}

export function CalculateWaterIntake(weight) {
  var dailyWaterIntake = (weight * 0.0333).toFixed(2);
  return 'Suggested Daily Water Intake: ' + dailyWaterIntake
}

export const CCalculator = () => {
  // Tools 
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [calculatorResult, setCalculatorResult] = useState("");

  return (
    <CForm>
      <h6 style={{ fontWeight: '900' }}>Tools</h6>
      <p><small>Type weight and height to get Body Mass Index or Daily Water Intake measurements.</small></p>

      <CCol md={12} style={{ marginBottom: '10px' }}>
        <CFormLabel htmlFor="validationCustom01">Enter Height (cm)</CFormLabel>
        <CFormInput type="number" id="validationCustom01" required onChange={e => setHeight(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom02">Enter Weight (kg)</CFormLabel>
        <CFormInput type="number" id="validationCustom02" required onChange={e => setWeight(e.target.value)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>


      <CCol md={12}>
        <CButton color='success' size={'sm'} style={{ width: '40%', margin: '16px 0' }}
          onClick={() => setCalculatorResult(CalculateBMI(weight, height))}><small>Calculate BMI</small></CButton>

        <CButton color='info' size={'sm'} className='float-end' style={{ width: '54%', margin: '16px 0' }}
          onClick={() => setCalculatorResult(CalculateWaterIntake(weight, height))}><small>Calculate Daily Water Intake</small></CButton>

        <p id='calculator'><strong>{calculatorResult}</strong></p>
      </CCol>

    </CForm>
  )
}