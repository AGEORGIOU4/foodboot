
import React from 'react'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { FormatTimestamp, mainUrl } from 'src/components/Common'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Route } from 'react-router-dom'
import { restApiDelete } from 'src/api_calls/rest'
import Swal from 'sweetalert2'
import { cilEye } from '@coreui/icons-pro'

const ClientsTable = (props) => {
  const columns = [
    {
      key: 'view', label: '',
      _style: { width: '0%' }, sorter: false, filter: false,
      _props: { color: 'success' }
    },
    { key: 'last_name', _props: { color: 'success' } },
    { key: 'first_name', _props: { color: 'success' } },
    { key: 'dob', label: 'DOB', _props: { color: 'success' } },
    { key: 'email', _props: { color: 'success' } },
    { key: 'phone', _props: { color: 'success' } },
    { key: 'address', _props: { color: 'success' } },
    { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false, _props: { color: 'success' } },
    { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false, _props: { color: 'success' } },
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
          dob: (item) => (
            <td>
              <FormatTimestamp date={item.dob} />
            </td>
          ),
          view:
            (item) => (
              <td>
                <CButton
                  size="sm"
                  color='primary'
                  variant="ghost"
                  onClick={() => { history.push({ pathname: "/clients/view-client", search: '?id=' + item.id }) }}

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
                  onClick={() => { history.push({ pathname: "/clients/edit-client", search: '?id=' + item.id }) }}
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
                      text: 'Delete '.concat(item.name).concat(' from clients? '),
                      showCancelButton: true,
                      icon: 'error',
                      iconColor: '#e55353',
                      confirmButtonText: `Yes, delete it!`,
                      confirmButtonColor: '#e55353'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Promise.resolve(
                          restApiDelete(mainUrl + '/clients/delete/' + item.id, item)
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

export default ClientsTable
