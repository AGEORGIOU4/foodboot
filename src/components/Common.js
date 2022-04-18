export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://foodboot-backend.herokuapp.com';
export const auth0APItoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVyRF9LdHljVHlQYUZTZFhPQ2h5bCJ9.eyJpc3MiOiJodHRwczovL2Zvb2Rib290LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mb29kYm9vdC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY1MDMxNjQxNSwiZXhwIjoxNjUyOTA4NDE1LCJhenAiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBVyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.NBUx7QlXPRfr7w8kL-vNsDEGc0kdvYi-aU04aaqPPEYDtnwz7WlCZ55erhiIzjxukFHHperDdVyE1c0tbCdo0SL_2gj-3NTO-V2pcvDsMcXGLtcNLmtyklkXO_ZXpFlgKavksr0Qd2Ujm25B2_izVDZGZG00a0uAjD74LaNn1Xe6dOopiiLMRoVKMwf7NiM60zuu3ABR4YeBAJpS2diLsUmuZ0sNlSDwTIoxEobakA4BbVlA3mUHnhlTFmL4Zv2zGf3hA3LlZifdomx8WFWy_JV_tAOTq88lcknUpiwV5w5Rh90eQa7jTDe_fuC0_YshTBzR1oim2b9Rmdu4qsgSxw';

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
