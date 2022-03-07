import React from 'react'
import { CImage, CSmartTable } from '@coreui/react-pro'

const UsersTable = (props) => {
  const columns = [
    { key: 'name' },
    { key: 'email' },
    { key: 'user_metadata', 'label': 'Role' },
    { key: 'picture', label: '', _style: { width: '1%' }, filter: false, sorter: false, },
  ]

  return (
    <CSmartTable
      sorterValue={{ column: 'name', state: 'asc' }}
      clickableRows
      tableProps={{
        striped: true,
        // hover: true,
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
      }}
    />
  )
}

export default UsersTable
