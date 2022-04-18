export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://foodboot-backend.herokuapp.com';
export const auth0APItoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVyRF9LdHljVHlQYUZTZFhPQ2h5bCJ9.eyJpc3MiOiJodHRwczovL2Zvb2Rib290LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mb29kYm9vdC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY1MDMxNzA4MiwiZXhwIjoxNjUyOTA5MDgyLCJhenAiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBVyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.g7qZmhfwmsW85N6a1WHD_MSVTUYLdg9AoilmSKOsAJRYhPWASPiiPLJY9DFNAeUTzP0YXK0OoPtd4YXCfHCJwCsg3sRZtuiahTxMiZDNZ3yqNGc1r5xi5_k7idKQHUHs70pdIu5uh7Txba1Jfd1rVZLLjm1sMlmYJUYR8Wy6o_UGOdKGeTsQb1XBpF96hrMc_buUPmStRMJv9Fu5iRzpyebx-qasVzjs1g6T2FfiziezzFftjEN1_VF4gBF2GEPCmCDBTJfbJvbHWi5cTsgIxYHsV3hoKry8R-MkrC8-2102tL3BwyoIR-mcXBxesdCQhTXFtRiFuYwRNFuVt9VNrg';

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
