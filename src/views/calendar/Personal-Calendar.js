import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import listPlugin from '@fullcalendar/list';
import adaptivePlugin from '@fullcalendar/adaptive'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { restApiDelete, restApiPost, restApiPut } from 'src/api_calls/rest'
import { mainUrl } from 'src/components/Common'
import { SwalMixin } from 'src/components/SweetAlerts/Swal'
import uuid from 'react-uuid'
import { CALENDAR_EVENTS } from './Load-Calendar'


let eventGuid = 0

function createEventId() {
  return String(eventGuid++)
}

export const PersonalCalendar = (props) => {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false)
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
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

  const handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Personal Calendar of <strong>{user.email}</strong>
        </CCardHeader>
        <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
          <CSpinner color='dark' variant='grow' />
        </CCardBody>
      </CCard>
      <FullCalendar
        schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, resourceTimelinePlugin, adaptivePlugin]}
        aspectRatio='1.5'
        headerToolbar={{
          left: 'title',
          right: 'prev,next,listMonth'
        }}
        footerToolbar={{
          right: 'today,dayGridMonth,timeGridWeek,timeGridDay,timeline'
        }}
        resourceAreaHeaderContent='Meals'
        resources={[{ "id": "a", "title": "Breakfast" }, { "id": "b", "title": "Lunch", "eventColor": "green" }, { "id": "c", "title": "Afternoon", "eventColor": "orange" }, { "id": "d", "title": "Dinner", "children": [{ "id": "d1", "title": "Room D1" }] }
          // your resource list
        ]}
        height={650}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={CALENDAR_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed

        /* you can update a remote database when these fire: */
        eventAdd={function (selectInfo) {
          if (selectInfo.event.title) {
            let event = {
              id: uuid(),
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
        }}

        eventChange={function (selectInfo) {

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
        }}

        eventRemove={function (selectInfo) {
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
        }}

      />

      <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
        <CSpinner color='dark' variant='grow' />
      </CCardBody>
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
