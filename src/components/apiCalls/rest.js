import axios from "axios";
import { SwalMixin } from "../SweetAlerts/Swal";

export async function restApiGet(url) {
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

export async function restApiPost(url, object, alertMessage) {
  var data = "";

  await axios.post(url, object).then(function (response) {
    console.log(response.data)
    data = response.data;
    SwalMixin('success', 'Client added!');
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

export async function restApiPut(url, object, showAlert) {
  var data = "";

  await axios.put(url, object).then(function (response) {
    console.log(response.data)
    data = response.data;
    (showAlert) ? (SwalMixin('success', 'Client updated!')) : 0;
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

export async function restApiDelete(url, item) {
  var data = "";

  await axios.delete(url).then(function (response) {
    console.log(response.data)
    data = response.data;
    SwalMixin('success', 'Deleted!');
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