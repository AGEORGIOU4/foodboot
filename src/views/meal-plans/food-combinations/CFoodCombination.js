import React from 'react'

import {
  CCol,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CButton,
  CFormSelect
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cidSave, cidTrash } from '@coreui/icons-pro'
import Swal from 'sweetalert2'
import { restApiDelete, restApiPut } from 'src/api_calls/rest'
import { mainUrl } from 'src/components/Common'
import { INITIAL_TYPES_OF_MEAL } from './INITIAL_TYPES_OF_MEALS'

export const CFoodCombination = (props) => {
  return (
    <CRow>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Title</CFormLabel>
        <CFormInput type="text" placeholder='Chicken with Rice' name="title" id="validationCustom01" required
          value={props.item.title}
          onChange={e => props.handleUpdateFoodCombination(props.index, e)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom02">Portion</CFormLabel>
        <CFormInput type="text" name="portion" placeholder='250gr' id="validationCustom02" required
          value={props.item.portion}
          onChange={e => props.handleUpdateFoodCombination(props.index, e)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom03">From</CFormLabel>
        <CFormInput type="time" name="start" id="validationCustom03" required
          value={props.item.start}
          onChange={e => props.handleUpdateFoodCombination(props.index, e)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom04">To</CFormLabel>
        <CFormInput type="time" name="end" id="validationCustom04" required
          value={props.item.end}
          onChange={e => props.handleUpdateFoodCombination(props.index, e)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom05">Type of Meal</CFormLabel>
        <CFormSelect name="typeOfMeal" id="validationCustom05" required
          options={INITIAL_TYPES_OF_MEAL}
          defaultValue='Breakfast'
          value={props.item.typeOfMeal}
          onChange={e => props.handleUpdateFoodCombination(props.index, e)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>

      {/* // Save */}
      <CCol lg={12} md={12} style={{ color: "black", textAlign: "end" }}>
        <CButton
          size="lg"
          color='success'
          variant="ghost"
          onClick={() => {
            Promise.resolve(
              restApiPut(mainUrl + '/meal-plans/food-combinations/update/' + props.item.id, props.item, true)
                .then(function (value) {
                })
            )
          }}

        ><CIcon icon={cidSave} /></CButton>

        {/* // Delete */}
        <CButton
          disabled={(props.item.id === 'undefined' ? true : false)}
          size="lg"
          color='danger'
          variant="ghost"
          onClick={() => {
            Swal.fire({
              text: 'Delete food combination?',
              showCancelButton: true,
              icon: 'error',
              iconColor: '#e55353',
              confirmButtonText: `Yes, delete it!`,
              confirmButtonColor: '#e55353'
            }).then((result) => {
              if (result.isConfirmed) {
                Promise.resolve(
                  restApiDelete(mainUrl + '/meal-plans/food-combinations/delete/' + props.item.id, props.item)
                    .then(function (value) {
                      props.resetData();
                    }));
              }
            })
          }}
        > <CIcon icon={cidTrash} /></CButton>
      </CCol>
    </CRow>
  )
}