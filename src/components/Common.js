// export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://foodboot-backend.herokuapp.com';
export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://dev.silversky3d.com/api-foodboot';

export const auth0APItoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVyRF9LdHljVHlQYUZTZFhPQ2h5bCJ9.eyJpc3MiOiJodHRwczovL2Zvb2Rib290LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mb29kYm9vdC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3OTMwOTE2MSwiZXhwIjoxNjgxOTAxMTYxLCJhenAiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBVyIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.gJbZWFv28kK8RiPpnWGqvMuwdg1gOVUr9yzrYQksUjLl7oWyCCCDlwpJLJGMbo346e1tPZ9i40UkvUKzt7Ve2vwoNPIUxLoO2_FmXLCT4BF-3DVlReCpI0ukhwDyryjs5nwTWFs7I0FHOERNN5c0ecKtfdUHeu6A7bV0yevz7HVyO1ENY3U65j1Y7iHBfe1t9iA9Az7yTMyEI60kVzdX4p2NNllVc37VdUctTdfMZ2e_hYV3Jg-EaFGg-vDHiTrGQpWyTEeAIwtll8dNVluKqQZ1hlcHuUIvYIVukwIc_2N4MsXo63Ea-UMDauhf24m-65fADT_pM9GcbangH0usLg';

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
