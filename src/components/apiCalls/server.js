import axios from "axios";
import { SwalMixin } from "../SweetAlerts/Swal";

export async function serverApiGet(url) {
  var data = "";

  await axios.get(url).then((response) => {
    console.log(response.data)
    data = response.data;
    return data;
  }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      SwalMixin('error', error.response.data.error);
    } else if (error.request) {
      console.log(error.request);
      SwalMixin('error', error);
    }
    console.log(error);
  });
  return data;
}

export async function serverApiPost(url, object) {
  var data = "";

  await axios.post(url, object
  ).then(function (response) {
    console.log(response.data)
    data = response.data;
    SwalMixin('success', 'Created!');
    return data;
  }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      SwalMixin('error', error.response.data.error);
    } else if (error.request) {
      console.log(error.request);
      SwalMixin('error', error);
    }
    console.log(error);
  });
  return data;
}