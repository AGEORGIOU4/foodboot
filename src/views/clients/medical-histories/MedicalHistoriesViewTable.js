import React from 'react'

import { CSmartTable, CButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'
import { Route } from 'react-router-dom'
import { FormatTimestamp, mainUrl } from 'src/components/Common'
import { restApiDelete } from 'src/api_calls/rest'

export const MedicalHistoriesViewTable = (props) => {
  const columns = [
    { key: 'date', _props: { color: 'info' } },
    { key: 'height', _props: { color: 'info' } },
    { key: 'weight', _props: { color: 'info' } },
    { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false, _props: { color: 'info' } },
    { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false, _props: { color: 'info' } },
  ]

  return (
    <Route render={({ history }) => (
      <CSmartTable
        sorterValue={{ column: 'date', state: 'desc' }}
        tableProps={{ striped: true, responsive: true }}
        activePage={1}
        items={props.data}
        columns={columns}
        tableFilter={props.display}
        loading={props.loading}
        itemsPerPageSelect={props.display}
        itemsPerPage={5}
        columnSorter
        pagination
        scopedColumns={{
          date: (item) => (
            <td>
              <FormatTimestamp date={item.date} />
            </td>
          ),
          edit:
            (item) => (
              <td>
                <CButton
                  style={{ display: (props.display) ? 'block' : 'none' }}
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={() => { history.push({ pathname: "/clients/edit-client", search: '?id=' + item.client_id }) }
                  }
                >
                  <CIcon icon={cilPencil} />
                </CButton>
              </td>
            ),
          remove:
            (item) => (
              <td >
                <CButton
                  style={{ display: (props.display) ? 'block' : 'none' }}
                  size="sm"
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
                          restApiDelete(mainUrl + '/clients/medical-histories/delete/' + item.id, item)
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
