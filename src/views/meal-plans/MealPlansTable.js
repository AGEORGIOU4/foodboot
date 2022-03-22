
import React from 'react'
import { CBadge, CButton, CCard, CCardBody, CCol, CSmartTable, CSpinner } from '@coreui/react-pro'
import { FormatTimestamp, mainUrl } from 'src/components/Common'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Route } from 'react-router-dom'
import { restApiDelete } from 'src/api_calls/rest'
import Swal from 'sweetalert2'
import { cilEye } from '@coreui/icons-pro'

const MealPlansTable = (props) => {
  const columns = [
    { key: 'card', label: "", sorter: false, filter: false },
    { key: 'client_last_name', label: 'Last Name', _props: { color: 'primary' } },
    { key: 'client_first_name', label: 'First Name', _props: { color: 'primary' } },
    { key: 'date', _props: { color: 'primary' } },
  ]

  return (
    <Route render={({ history }) => (
      <CSmartTable
        header={false}
        sorterValue={{ column: 'last_name', state: 'asc' }}
        activePage={1}
        items={props.data}
        columns={columns}
        tableFilter
        cleaner
        loading={props.loading}
        itemsPerPageSelect
        itemsPerPage={5}
        columnSorter
        pagination
        scopedColumns={{
          'card':
            (item) => (
              <td>
                <CCard style={{ padding: "0", margin: "0" }}>
                  <CCardBody>

                    <div style={{ width: '100%' }}>
                      <div style={{ width: "20%", float: 'left', marginLeft: '-6px', marginRight: '6px' }}>

                      </div>

                      <div style={{ width: "70%", float: 'left' }}>
                        <strong style={{ fontSize: 'medium' }}> {item.client_first_name} {item.client_last_name}</strong>
                      </div>
                    </div>

                    <div style={{ width: "30%", float: 'left', textAlign: 'end' }}>
                      <CBadge color={'success'}><FormatTimestamp date={item.date} /></CBadge>
                    </div>

                    <div style={{ width: "100%", float: 'left' }}>
                      <small>Weight:</small> <CBadge color={'info'}><strong>{item.weight} kg</strong></CBadge>
                    </div>

                    <div style={{ width: "80%", float: 'left' }}>
                      <small>Age:</small> <CBadge color={'warning'}><strong>{item.age}</strong></CBadge>
                    </div>

                    <CCol style={{ textAlign: 'end', paddingRight: '0' }}>

                    </CCol>

                    <div style={{ width: "20%", float: 'left', textAlign: 'end' }}>
                      <CButton
                        size="sm"
                        color='primary'
                        variant="ghost"
                        onClick={() => { history.push({ pathname: "/meal-plans/view-meal-plan", search: '?id=' + item.client_id + '&meal_plan_id=' + item.id }) }}
                      >
                        <CIcon icon={cilEye} /></CButton>

                      <CButton
                        size="sm"
                        color='success'
                        variant="ghost"
                        onClick={() => { history.push({ pathname: "/meal-plans/update-meal-plan", search: '?id=' + item.client_id + '&meal_plan_id=' + item.id }) }}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>

                      <CButton
                        size="sm"
                        color='danger'
                        variant="ghost"
                        onClick={() => {
                          Swal.fire({
                            text: 'Delete '.concat(item.client_first_name).concat(' meal plan? '),
                            showCancelButton: true,
                            icon: 'error',
                            iconColor: '#e55353',
                            confirmButtonText: `Yes, delete it!`,
                            confirmButtonColor: '#e55353'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Promise.resolve(
                                restApiDelete(mainUrl + '/meal-plans/delete/' + item.id, item)
                                  .then(function (value) {
                                    props.resetData();
                                  }));
                            }
                          })
                        }}
                      > <CIcon icon={cilTrash} /></CButton>
                    </div>

                  </CCardBody>

                  <CCardBody style={{ textAlign: 'center', display: (props.loading) ? "block" : "none" }}>
                    <CSpinner color='dark' variant='grow' />
                  </CCardBody>
                </CCard>
              </td>
            ),
          'client_last_name':
            (item) => (
              <td
                style={{ display: "none" }}>
              </td>
            ),
          'client_first_name':
            (item) => (
              <td
                style={{ display: "none" }}>
              </td>
            ),
          'date':
            (item) => (
              <td
                style={{ display: "none" }}>
              </td>
            ),
        }}
      />
    )} />
  )
}

export default MealPlansTable
