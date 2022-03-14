import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { restApiGet, restApiPost } from 'src/api_calls/rest'
import { mainUrl } from 'src/components/Common'

export var CALENDAR_EVENTS = [];

export const CalendarValues = () => {
  const { user } = useAuth0();

  // Retrieve calendar
  React.useEffect(() => {
    Promise.resolve(
      restApiGet(mainUrl + '/calendars/'.concat(user.email))
        .then(function (value) {
          if (value) { // validate user
            // retrieve events
            Promise.resolve(
              restApiGet(mainUrl + '/calendars/calendar-events/'.concat(user.email))
                .then(function (value) {
                  CALENDAR_EVENTS = value;
                  return CALENDAR_EVENTS;
                }).catch(function () {
                }));
          } else {
            let calendar = { user_email: user.email }

            //Create calendar
            Promise.resolve(
              restApiPost(mainUrl + '/calendars/create', calendar, true)
                .then(function (value) {
                  return value;
                }).catch(function () {
                  return value;
                }));
          }
        }));
  }, []);
}
