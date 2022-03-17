import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react-pro'
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
        <CCardHeader inline>
          <CSpinner color='dark' className="me-1 float-end" style={{ display: (loading) ? "block" : "none" }} variant='grow' />
          Personal Calendar of <strong>{user.email}</strong>
        </CCardHeader>
      </CCard>
      <div style={{ opacity: '0.1' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'title',
            right: 'prev,next,listMonth'
          }}
          footerToolbar={{
            center: 'today,dayGridMonth,timeGridWeek,timeGridDay'
          }}
          right={650}
          initialView="dayGridMonth"
        />
      </div>
    </>
  )
}

export default withAuthenticationRequired(LoadCalendar)