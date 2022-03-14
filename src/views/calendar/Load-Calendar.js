import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarValues } from './CalendarValues'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CCard, CButton, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilCloudData } from '@coreui/icons-pro'
import { cilCloudDownload } from '@coreui/icons'

const LoadCalendar = () => {

  const [loading, setLoading] = useState(false)

  CalendarValues();

  return (
    <>
      <CCard className="mb-4" >
        <CCardHeader style={{ textAlign: 'end' }}>
          <CButton
            href='#/personal-calendar'
            size="sm"
            color='info'
            variant="ghost"
          ><CIcon icon={cilCloudDownload} /> Fetch my Cloud Calendar!</CButton>
        </CCardHeader>
        <CCardBody style={{ opacity: '0.2' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: ''
            }}
            footerToolbar={{
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView="dayGridMonth"
            handleWindowResize={true}

          />
        </CCardBody>

        <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
          <CSpinner color='dark' variant='grow' />
        </CCardBody>
      </CCard>
    </>
  )
}

export default withAuthenticationRequired(LoadCalendar)