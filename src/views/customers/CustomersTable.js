import React from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { FormatTimestamp, removeTime } from 'src/components/Common'

const CustomersTable = (props) => {
  const columns = [
    { key: 'name' },
    { key: 'surname' },
    { key: 'email' },
    { key: 'phone' },
    { key: 'dob', label: 'DOB' }
  ]

  return (
    <CSmartTable
      sorterValue={{ column: 'name', state: 'asc' }}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
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
      }}
    />
  )
}

export default CustomersTable
