import React from 'react'
import { CButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'

const ClientsTableTemplate = (props) => {
  var items = [
    { last_name: 'Last Name' },
    { first_name: 'First Name' },
    { dob: 'DOB (yyyy-mm-dd' },
    { gender: 'Gender' },
    { email: 'Email' },
    { phone: 'Phone' },
    { address: 'Address' },
    { food_allergies: 'Food Allergies' }
  ];

  const csvContent = items.map((item) => Object.values(item).join(','))
  const csvCode = 'data:text/csv;charset=utf-8,SEP=,%0A' + encodeURIComponent(csvContent)

  return (
    <CButton
      href={csvCode}
      download="template.csv"
      target="_blank"
      className="me-1 float-end"
      size="sm"
      color='info'
      variant="ghost"
    ><CIcon icon={cilNotes} /> Download template (.csv)
    </CButton>
  )
}

export default ClientsTableTemplate
