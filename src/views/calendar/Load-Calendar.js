import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import { restApiGet, restApiPost } from 'src/api_calls/rest'
import { mainUrl } from 'src/components/Common'
import { useHistory } from 'react-router-dom';

export var CALENDAR_EVENTS = [];

const LoadCalendar = () => {
  const [loading, setLoading] = useState(false)

  const { user } = useAuth0();
  const history = useHistory();

  // Retrieve calendar
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/calendars/'.concat(user.email))
        .then(function (value) {
          if (value) { // validate user

            // retrieve events
            Promise.resolve(
              restApiGet(mainUrl + '/calendars/calendar-events/'.concat(user.email))
                .then(function (value) {
                  CALENDAR_EVENTS = value;
                  setLoading(false);
                  if (value) {
                    history.push("/personal-calendar");
                  }
                  return CALENDAR_EVENTS;
                }).catch(function () {
                  setLoading(false);
                }));
          } else {
            let calendar = { user_email: user.email }

            //Create calendar
            Promise.resolve(
              restApiPost(mainUrl + '/calendars/create', calendar, true)
                .then(function (value) {
                  setLoading(false);
                  if (value) {
                    history.push("/personal-calendar");
                  }
                  return value;
                }).catch(function () {
                  setLoading(false);
                  return value;
                }));
          }
        }));
  }, []);

  return (
    <>
      <CCard className="mb-4" >
        <CCardHeader style={{ textAlign: 'end' }}>

          <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
            <CSpinner color='dark' variant='grow' />
          </CCardBody>
        </CCardHeader>
        <CCardBody style={{ opacity: '0.2' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'title',
              right: 'prev,next today'
            }}
            footerToolbar={{
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView="dayGridMonth"
            handleWindowResize={true}

          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default withAuthenticationRequired(LoadCalendar)