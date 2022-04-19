export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://foodboot-backend.herokuapp.com';
export const auth0APItoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVyRF9LdHljVHlQYUZTZFhPQ2h5bCJ9.eyJpc3MiOiJodHRwczovL2Zvb2Rib290LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mb29kYm9vdC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY1MDM5NjQxNSwiZXhwIjoxNjUyOTg4NDE1LCJhenAiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBVyIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.qyILpP1ht0dWWwiL_MNOLj3tRSc9diYFsVd3tTpojHmv9Ok9YsH6tnrKsgRo2Ph_UPDYmGeVlHx67oLXpgDUQHV9nAsrsIHdEXSPdhGSlg9qCjHKXzIm7jtZ_OQtBJIxsX9wbEZDFklO8TkbAd9Rok9fjvUWxNwDxGUM_4-D4c5ml7jc4QlnRbK2CcoWBWg7d0xbz2oHs8M3H89JOITml0faklfktL-7ldfvDuMR-xUgnIv9zB5MY1EWaEUyx-NEEHeyIuoKdnpwcbp03ULbvBd1cjYt3VyU7-ZibTIqY7nTjJspK_4sgRiqZf-XOOcb9D8fjsUly8xYKvVUk5iIFw';

console.log("Fetching data from " + mainUrl);

export const FormatTimestamp = (props) => {
  var date = new Date(props.date);
  var setMonth = date.getMonth() + 1;
  var formattedDate = date.getDate() + '/' + setMonth + '/' + date.getFullYear();

  return formattedDate;
}

export function FormatTimestampFunction(date) {
  var date = new Date(date);
  var setDate = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
  var incrementMonth = date.getMonth() + 1;
  var setMonth = (incrementMonth) < 10 ? '0' + incrementMonth : incrementMonth;

  var formattedDate = date.getFullYear() + '-' + setMonth + '-' + setDate;

  return formattedDate;
}

export function FormatTimestampFunction2(date) {
  var date = new Date(date);
  var setMonth = date.getMonth() + 1;
  var formattedDate = date.getDate() + '/' + setMonth + '/' + date.getFullYear();

  return formattedDate;
}
