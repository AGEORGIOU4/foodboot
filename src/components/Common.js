export const customersUrl = 'http://localhost:5000';

export const FormatTimestamp = (props) => {

  var date = new Date(props.date);
  var setMonth = date.getMonth() + 1;
  var formattedDate = date.getDate() + '/' + setMonth + '/' + date.getFullYear();

  return formattedDate;
}