
import React from 'react'
import { CButton, CLink, CSmartTable } from '@coreui/react-pro'
import { FormatTimestamp, mainUrl } from 'src/components/Common'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Route } from 'react-router-dom'
import { restApiDelete } from 'src/components/apiCalls/rest'
import Swal from 'sweetalert2'

const ClientsTable = (props) => {
  const columns = [
    { key: 'name' },
    { key: 'surname' },
    { key: 'email' },
    { key: 'phone' },
    { key: 'dob', label: 'DOB' },
    { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
    { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  ]

  return (
    <Route render={({ history }) => (
      <CSmartTable
        sorterValue={{ column: 'name', state: 'asc' }}
        clickableRows
        tableProps={{
          striped: true,
          hover: true,
          responsive: true
        }}
        activePage={1}
        items={props.data}
        columns={columns}
        columnFilter
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
          edit:
            (item) => (
              <td>
                <CLink disabled href='#/edit-client'>
                  <CButton
                    size="sm"
                    color='success'
                    variant="outline"
                    onClick={() => {
                      history.push({
                        pathname: "/edit-client",
                        state: item
                      })
                    }}

                  ><CIcon icon={cilPencil} /></CButton>
                </CLink>
              </td>
            ),
          remove:
            (item) => (
              <td>
                <CButton
                  size="sm"
                  color='danger'
                  variant="outline"
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
                              window.location.reload(false);
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
