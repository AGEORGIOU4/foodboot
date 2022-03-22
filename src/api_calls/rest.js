import axios from "axios";
import { SwalMixin } from "../components/SweetAlerts/Swal";

export async function restApiGet(url, showAlert) {
  var data = "";

  await axios.get(url).then((response) => {
    //console.log(response.data)
    data = response.data;
    return data;
  }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      (showAlert) ? (SwalMixin('error', error.response.data.error)) : 0;
    } else if (error.request) {
      console.log(error.request);
      (showAlert) ? (SwalMixin('error', error)) : 0;
      SwalMixin('error', error);
    }
    console.log(error);
  });
  return data;
}

export async function restApiPost(url, object, showAlert) {
  var data = "";

  await axios.post(url, object).then(function (response) {
    //console.log(response.data)
    data = response.data;
    (showAlert) ? (SwalMixin('success', response.data.message)) : 0;
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
    //  console.log(response.data)
    data = response.data;
    (showAlert) ? (SwalMixin('success', response.data.message)) : 0;
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

export async function restApiDelete(url) {
  var data = "";

  await axios.delete(url).then(function (response) {
    // console.log(response.data)
    data = response.data;
    SwalMixin('success', response.data.message);
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