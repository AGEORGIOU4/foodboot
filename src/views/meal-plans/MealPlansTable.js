
import React, { useState } from 'react'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { FormatTimestamp, mainUrl } from 'src/components/Common'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Route } from 'react-router-dom'
import { restApiDelete } from 'src/api_calls/rest'
import Swal from 'sweetalert2'
import { cilEye } from '@coreui/icons-pro'

const MealPlansTable = (props) => {
  const columns = [
    {
      key: 'view', label: '',
      _style: { width: '0%' }, sorter: false, filter: false,
      _props: { color: 'primary' }
    },
    { key: 'client_last_name', label: 'Last Name', _props: { color: 'primary' } },
    { key: 'client_first_name', label: 'First Name', _props: { color: 'primary' } },
    { key: 'age', _props: { color: 'primary' } },
    { key: 'weight', _props: { color: 'primary' } },
    { key: 'notes', _props: { color: 'primary' } },
    { key: 'date', _props: { color: 'primary' } },
    { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false, _props: { color: 'primary' } },
    { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false, _props: { color: 'primary' } },
  ]

  return (
    <Route render={({ history }) => (
      <CSmartTable
        sorterValue={{ column: 'last_name', state: 'asc' }}
        tableProps={{ striped: true, responsive: true }}
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
          date: (item) => (
            <td>
              <FormatTimestamp date={item.date} />
            </td>
          ),
          view:
            (item) => (
              <td>
                <CButton
                  size="sm"
                  color='primary'
                  variant="ghost"
                  onClick={() => { history.push({ pathname: "/meal-plans/view-meal-plan", search: '?id=' + item.id }) }}

                ><CIcon icon={cilEye} /></CButton>
              </td>
            ),
          edit:
            (item) => (
              <td>
                <CButton
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={() => { history.push({ pathname: "/meal-plans/edit-meal-plan", search: '?id=' + item.id }) }}
                >
                  <CIcon icon={cilPencil} />
                </CButton>
              </td>
            ),
          remove:
            (item) => (
              <td>
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
              </td >
            ),
        }}
      />
    )} />
  )
}

export default MealPlansTable
