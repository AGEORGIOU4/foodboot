import React from 'react'
import { CImage, CSmartTable, CButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const UsersTable = (props) => {
  const columns = [
    { key: 'given_name' },
    { key: 'family_name' },
    { key: 'email' },
    { key: 'user_metadata', 'label': 'Role' },
    { key: 'picture', label: '', filter: false, sorter: false, },
    { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
    { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  ]

  return (
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
        user_metadata: (item) => (
          <td>
            {(item.user_metadata) ? item.user_metadata.role : 'N/A'}
          </td>
        ),
        picture: (item) => (
          <td>
            <CImage src={(item.picture) ? item.picture : "avatar.png"}
              width="36" height="36"
              rounded={true} />
          </td>
        ),
        edit:
          (item) => (
            <td>
              <CButton
                size="sm"
                color='success'
                variant="outline"
                onClick={() => {
                  //   this.removeAdmin(item.email)
                }}

              ><CIcon icon={cilPencil} /></CButton>
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
                  //   this.removeAdmin(item.email)
                }}

              ><CIcon icon={cilTrash} /></CButton>
            </td>
          ),
      }}
    />
  )
}

export default UsersTable
