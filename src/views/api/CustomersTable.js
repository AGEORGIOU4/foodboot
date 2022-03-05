import React, { useState } from 'react'
import { CBadge, CButton, CCardBody, CCollapse, CImage, CSmartTable } from '@coreui/react-pro'

const CustomersTable = (props) => {
  const [details, setDetails] = useState([])
  const columns = [
    { key: 'name', _style: { width: '40%' } },
    { key: 'email', _style: { width: '40%' }, },
    { key: 'picture', _style: { width: '0' }, label: '', sorter: false, filter: false },
    { key: 'show_details', label: '', _style: { width: '1%' }, filter: false, sorter: false, },
  ]
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  return (
    <CSmartTable
      sorterValue={{ column: 'name', state: 'asc' }}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
      }}
      activePage={3}
      items={props.data}
      columns={columns}
      columnFilter
      tableFilter
      cleaner
      itemsPerPageSelect
      itemsPerPage={5}
      columnSorter
      pagination
      scopedColumns={{
        picture: (item) => (
          <td>
            <CImage src={(item.picture) ? item.picture : "avatar.png"}
              width="36" height="36"
              shape="rounded-circle" />
          </td>
        ),
        show_details: (item) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(item.id)
                }}
              >
                {details.includes(item.id) ? 'Hide' : 'Show'}
              </CButton>
            </td>
          )
        },
        details: (item) => {
          return (
            <CCollapse visible={details.includes(item.id)}>
              <CCardBody>
                <h4>{item.username}</h4>
                <p className="text-muted">User since: {item.registered}</p>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          )
        },
      }}
    />
  )
}

export default CustomersTable
