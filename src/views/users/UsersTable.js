import React from 'react'
import { CImage, CSmartTable } from '@coreui/react-pro'

const UsersTable = (props) => {
  const columns = [
    { key: 'name' },
    { key: 'email' },
    { key: 'picture', _style: { width: '1%' }, filter: false, sorter: false, },
  ]

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
      loading={props.loading}
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
      }}
    />
  )
}

export default UsersTable
