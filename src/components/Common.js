export const mainUrl = 'https://dev.silversky3d.com/api-foodboot';
//export const mainUrl = (window.location.hostname == 'localhost') ? 'http://localhost:5000' : 'https://dev.silversky3d.com/api-foodboot';

export const auth0APItoken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVyRF9LdHljVHlQYUZTZFhPQ2h5bCJ9.eyJpc3MiOiJodHRwczovL2Zvb2Rib290LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9mb29kYm9vdC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwMTY3NjU2MSwiZXhwIjoxNzA0MjY4NTYxLCJhenAiOiJxeVRpVWZnYmNtQ3BJanBrZ1NaZEtUOUNXTmZSTVVBVyIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOmNsaWVudHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Xhb_df_33eHrbrvsSVP5KauwFwxwEHXfv_Q78RI_tg0XTXtsfFsHmSpTdUWPd8EBHApgvo3ANVL9awYUD-9U65iZSJ0WYZvHlNdAuQuWe8ZFuPvVJr70dQO688-M189DXAdbUgTeolNyvlqT8O8lt7lApd8Bvb8XFLmHfyf_fDPmqao1FpDuIwtSXPjhgp7Hh1J5MAuGo_0vMEo2lpDVRIRNMExtSPjCrX-kMxnpLOH0Z6Ffe3CFMb1Bw9UdGeijFBJj-HZ1x75j-44ERBhveH-iq6f0csVZiXmNj4p6m2WtHrCAwAjflkFYLnHDsGMcGXZfvELEVzgRXtJiInUttg';

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
