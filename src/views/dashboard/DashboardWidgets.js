import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react-pro'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { restApiGet } from 'src/api_calls/rest'
import { mainUrl } from 'src/components/Common'

const DashboardWidgets = (props) => {
  const [total_clients, setTotalClients] = useState(0);
  const [total_calendar_events, setTotalCalendarEvents] = useState(0);

  // Count Users
  React.useEffect(() => {
    Promise.resolve(
      restApiGet(mainUrl + '/clients/count')
        .then(function (value) {
          if (value) {
            setTotalClients(value.count);
          }
          console.log(value.count);
        }
        ))
  });

  // // Count Calendar Events
  React.useEffect(() => {
    Promise.resolve(
      restApiGet(mainUrl + '/calendars/calendar-events/count/' + props.user_email)
        .then(function (value) {
          if (value) {
            setTotalCalendarEvents(value.count);
          }
          console.log(value.count);
        }
        ))
  });

  return (
    <CRow>
      <CCol sm={12} lg={7}>

        <CButton style={{ width: '100%', margin: '0 0 10px' }} href='/#/calendar'>Personal Calendar</CButton>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          height={300}
          headerToolbar={{ left: 'title', right: 'prev,next' }}
          initialView="dayGridMonth"
        />

      </CCol>

      <CCol lg={5}>
        <CCol sm={12} lg={12}>
          <CWidgetStatsA
            className="mb-4"
            color="warning-gradient"
            value={
              <>
                {total_clients}
              </>
            }
            title="Total Clients"
            action={
              <CButton color={'warning'} alignment="end"
                href='/#/clients'
              >
                View
              </CButton>

            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-warning'),
                      data: [1, 18, 9, 17, 34, 22, 11],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={12} lg={12}>
          <CWidgetStatsA
            className="mb-4"
            color="warning-gradient"
            value={
              <>
                {total_calendar_events}
              </>
            }
            title="Total Calendar Events"
            action={
              <CButton color={'warning'} alignment="end" href='/#/calendar'>
                View
              </CButton>
            }
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>

      </CCol>
    </CRow>
  )
}

export default DashboardWidgets
