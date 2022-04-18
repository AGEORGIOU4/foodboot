export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://foodboot-backend.herokuapp.com';
export const auth0APItoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVyRF9LdHljVHlQYUZTZFhPQ2h5bCJ9.eyJpc3MiOiJodHRwczovL2Zvb2Rib290LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mb29kYm9vdC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY1MDMxNTc5MCwiZXhwIjoxNjUyOTA3NzkwLCJhenAiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBVyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.RRZFjC6pGMQqbkSwHSSu6fXIgQ3gN6FDlGJI_bW0mIL3NaI2YFU6pdprOakFWZSrzftosFu7IJNaFIS3D8vjS2Q3IeqoTBu5SFlUfAR1Z7stdnWPfISkF8OLzbL4PTujHAyNm3p5BjhjBtxtfq9vQxnTJzDr7tpoQL9InCDme7yJNkIseyvGN5pp0EbQYyqE-PJncjjTU6m3BZhnGU7CsVx9iKvicqP2WozsXoxtVicdDwh3BegS7ULzFhZiVneqvlqJuY2znd8KvQyN8eUbqZUEXc-aUY3g5y-7_QDrwpq1HJoO56IlzfrPWhJDY5gjMJZQnM856XA8Hy9260kOnA';

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
