import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import adaptivePlugin from '@fullcalendar/adaptive'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { restApiDelete, restApiPost, restApiPut } from 'src/api_calls/rest'
import { mainUrl } from 'src/components/Common'
import { SwalMixin } from 'src/components/SweetAlerts/Swal'
import { CALENDAR_EVENTS } from './Load-Calendar'
import uuid from 'react-uuid'

let eventGuid = 0;
function createEventId() {
  eventGuid = uuid()
  return String(eventGuid)
}

export const PersonalCalendar = (props) => {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false)
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleEvents = (events) => {
    setCurrentEvents(events)
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })

    }
  }

  function addEvent(selectInfo) {
    if (selectInfo.event.title) {
      let event = {
        id: createEventId(),
        user_email: user.email,
        title: selectInfo.event.title,
        start: selectInfo.event.start,
        end: selectInfo.event.end,
        allDay: selectInfo.event._def.allDay,
      }
      Promise.resolve(
        restApiPost(mainUrl + '/calendars/calendar-events/create', event, false)
          .then(function (value) {
            SwalMixin('success', 'Event Added!')
            setCurrentEvents(...currentEvents, value);
            setLoading(false);
          }).catch(function () {
            setLoading(false);
          }));
    }
  }

  function editEvent(selectInfo) {
    if (selectInfo.event.id) {
      let updated_event = {
        id: selectInfo.event.id,
        user_email: user.email,
        title: selectInfo.event.title,
        start: selectInfo.event.start,
        end: selectInfo.event.end,
        allDay: selectInfo.event._def.allDay,
      }
      Promise.resolve(
        restApiPut(mainUrl + '/calendars/calendar-events/update/' + selectInfo.event.id, updated_event, true)
          .then(function (value) {
            setCurrentEvents(...currentEvents, value);
            setLoading(false);
          }).catch(function () {
            setLoading(false);
          }));
    }
  }

  function deleteEvent(selectInfo) {
    if (selectInfo.event.id) {
      Promise.resolve(
        restApiDelete(mainUrl + '/calendars/calendar-events/delete/' + selectInfo.event.id)
          .then(function (value) {
            setCurrentEvents(...currentEvents, value);
            setLoading(false);
          }).catch(function () {
            setLoading(false);
          }));
    }
  }

  const handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CSpinner color='dark' className="me-1 float-end" style={{ display: (loading) ? "block" : "none" }} variant='grow' />
          Personal Calendar of <strong>{user.email}</strong>
        </CCardHeader>

        <CCardBody>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, adaptivePlugin]}
            height={650}
            headerToolbar={{ left: 'title', right: 'prev,next,listMonth' }}
            footerToolbar={{ right: 'today,dayGridMonth,timeGridWeek,timeGridDay' }}
            initialView="dayGridMonth"
            initialEvents={CALENDAR_EVENTS}
            schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
            editable={true}
            selectable={true}
            selectMirror={true}

            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}

            eventAdd={addEvent}
            eventChange={editEvent}
            eventRemove={deleteEvent}
          />
        </CCardBody>
        <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
          <CSpinner color='dark' variant='grow' />
        </CCardBody>

      </CCard>
    </>
  )
}

const renderEventContent = (eventInfo) => {
  return (

    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default withAuthenticationRequired(PersonalCalendar)
