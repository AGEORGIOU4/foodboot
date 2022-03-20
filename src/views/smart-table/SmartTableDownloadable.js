import React from 'react'
import { CButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons-pro'

const SmartTableDownloadable = (props) => {
  var items = props.data;
  const csvContent = items.map((item) => Object.values(item).join(',')).join('\n')
  const csvCode = 'data:text/csv;charset=utf-8,SEP=,%0A' + encodeURIComponent(csvContent)

  return (
    <CButton
      href={csvCode}
      download="clients.csv"
      target="_blank"
      className="me-1 float-end"
      size="sm"
      color='info'
      variant="ghost"
    >
      <CIcon icon={cilCloudDownload} /> Export clients (.csv)
    </CButton>
  )
}

export default SmartTableDownloadable
