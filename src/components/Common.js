export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://foodboot-backend.herokuapp.com';
export const auth0APItoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVyRF9LdHljVHlQYUZTZFhPQ2h5bCJ9.eyJpc3MiOiJodHRwczovL2Zvb2Rib290LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mb29kYm9vdC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3ODQ1NDU2MiwiZXhwIjoxNjgxMDQ2NTYyLCJhenAiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBVyIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.m9oSFhDxbi44zO6E-bfYpwh18pYCEcqUKoZXlf4ea6vi3jYUUZ6n8IuAfdQFMhLZvnzckdj2iBh_e3cTeTJmxpitoJBzPp1tVr1DThp0RqTgW46sG7zZRwTQ-7KkD0ROh8GtgAEUEPQIKQOjscUpm3qeqiHASil8eQU6ZBdwSPto-wbIb2Nr67r-STcukbFEKbqVl4L0DoDp8QiOLuw7luPIYudvjj0z7a31mI4sdCFRyMJfcBh8EhtC85twbtCNrZ6y6DdWgqBVR5GaceVRlPcIGm9GIKytwZuME9P1jVK6d4zKLKNsWOAhVbUylzoFZDkFWoQzOyzI8FSvTC-siA';

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
