import React from 'react'
import { CSmartTable, CButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { Route } from 'react-router-dom'

export const FoodCombinationsViewTable = (props) => {
  const columns = [
    { key: 'start', label: 'From', _props: { color: 'light' }, _style: { width: '10%', borderBottom: '3px solid' } },
    { key: 'end', label: 'To', _props: { color: 'light' }, _style: { width: '10%', borderRight: '3px solid', borderBottom: '3px solid' } },
    { key: 'title', label: props.title, _props: { color: props.color }, _style: { width: '40%', borderBottom: '3px solid' } },
    { key: 'portion', _props: { color: props.color }, _style: { width: '20%', borderBottom: '3px solid' } },
    { key: 'typeOfMeal', _props: { color: props.color }, _style: { width: '10%', borderBottom: '3px solid' } },
    { key: 'day', _props: { color: props.color }, _style: { width: '10%', borderBottom: '3px solid' } }

  ]

  return (
    <Route render={({ history }) => (
      <CSmartTable
        columnFilterValue={{ typeOfMeal: props.typeOfMeal, day: props.day }}
        sorterValue={{ column: 'start', state: 'asc' }}
        items={props.data}
        tableProps={{ responsive: true }}
        columns={columns}
        loading={props.loading}
        scopedColumns={{
          start:
            (item) => (
              <td>
                {item.start}
              </td>
            ),
          end:
            (item) => (
              <td style={{ borderRight: '3px solid' }}>
                {item.end}
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
                  onClick={() => { history.push({ pathname: "/meal-plans/update-meal-plan", search: '?id=' }) }
                  }
                >
                  <CIcon icon={cilPencil} />
                </CButton>
              </td>
            ),
        }}
      />
    )} />
  )
}
