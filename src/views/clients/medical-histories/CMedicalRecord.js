import React from 'react'

import {
  CCol,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CButton
} from '@coreui/react-pro'
import { FormatTimestampFunction, mainUrl } from 'src/components/Common';
import CIcon from '@coreui/icons-react';
import { cidSave, cidTrash } from '@coreui/icons-pro';
import { restApiDelete, restApiPut } from 'src/api_calls/rest';
import Swal from 'sweetalert2';

export const CMedicalRecord = (props) => {
  return (
    <CRow>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom08">Date Updated</CFormLabel>
        <CFormInput type="date" name="date" id="validationCustom08" required
          value={FormatTimestampFunction(props.item.date) || ""}
          onChange={e => props.handleUpdateMedicalHistory(props.index, e)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom09">Height</CFormLabel>
        <CFormInput type="number" name="height" id="validationCustom09" required
          value={props.item.height}
          onChange={e => props.handleUpdateMedicalHistory(props.index, e)} />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom10">Weight</CFormLabel>
        <CFormInput type="number" name="weight" id="validationCustom10" required
          value={props.item.weight}
          onChange={e => props.handleUpdateMedicalHistory(props.index, e)} />
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
              restApiPut(mainUrl + '/clients/medical-histories/update/' + props.item.id, props.item, true)
                .then(function (value) {
                })
            )
          }}

        ><CIcon icon={cidSave} /></CButton>

        {/* // Delete */}
        <CButton
          disabled={(props.item.id === 'undefinced' ? true : false)}
          size="lg"
          color='danger'
          variant="ghost"
          onClick={() => {
            Swal.fire({
              text: 'Delete medical record?',
              showCancelButton: true,
              icon: 'error',
              iconColor: '#e55353',
              confirmButtonText: `Yes, delete it!`,
              confirmButtonColor: '#e55353'
            }).then((result) => {
              if (result.isConfirmed) {
                Promise.resolve(
                  restApiDelete(mainUrl + '/clients/medical-histories/delete/' + props.item.id, props.item)
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