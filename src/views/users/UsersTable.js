import React from 'react'
import { CImage, CSmartTable, CButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const UsersTable = (props) => {
  const columns = [
    {
      key: 'picture', label: '', filter: false, sorter: false, _props: { color: 'primary' }
    },
    { key: 'given_name', _props: { color: 'primary' } },
    { key: 'family_name', _props: { color: 'primary' } },
    { key: 'email', _props: { color: 'primary' } },
    { key: 'user_metadata', 'label': 'Role', _props: { color: 'primary' } }
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
      // columnFilter
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
      }}
    />
  )
}

export default UsersTable
