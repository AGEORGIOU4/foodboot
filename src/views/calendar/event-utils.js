let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS =
  [
    {
      "id": "1",
      "user_email": "andreasg046@gmail.com",
      "title": "hello",
      "start": "2022-03-14T22:00:00.000Z",
      "end": "2022-03-15T22:00:00.000Z",
      "allDay": true
    },
    {
      "id": "14",
      "user_email": "andreasg046@gmail.com",
      "title": "Hellooo",
      "start": "2022-03-31",
      "end": "2022-04-01",
      "allDay": true
    },
    {
      "id": "3",
      "user_email": "andreasg046@gmail.com",
      "title": "Testing",
      "start": "2022-03-10T22:00:00.000Z",
      "end": "2022-03-11T22:00:00.000Z",
      "allDay": true
    },
    {
      "id": "5",
      "user_email": "andreasg046@gmail.com",
      "title": "allday",
      "start": "2022-03-17T22:00:00.000Z",
      "end": "2022-03-18T22:00:00.000Z",
      "allDay": true
    },
    {
      "id": "7",
      "user_email": "andreasg046@gmail.com",
      "title": "asdasd",
      "start": "2022-03-16T22:00:00.000Z",
      "end": "2022-03-17T22:00:00.000Z",
      "allDay": true
    }
  ]
export function createEventId() {
  return String(eventGuid++)
}

