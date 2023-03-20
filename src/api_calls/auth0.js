import Swal from "sweetalert2";
import axios from "axios";
import { SwalBottomToast2, SwalMixin } from "../components/SweetAlerts/Swal";
import { auth0APItoken } from "../components/Common";

export async function auth0ApiCall(method, url, params, atomic) {
  var data = "";

  var options = {
    method: method,
    url: url,
    params: { params },
    headers: { authorization: 'Bearer ' + auth0APItoken }
  };

  await axios.request(options).then((response) => {
    console.log((atomic) ? response.data[0] : response.data)
    data = ((atomic) ? response.data[0] : response.data);
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

export const SetUserInfo = async (user_id, firstName, lastName, role) => {
  var firstName = "";
  var lastName = "";
  var role = "";

  var object = {};

  if (user_id.includes("google")) {
    const steps = ['1']
    const swalQueue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Next',
      confirmButtonColor: '#635dff',
      allowOutsideClick: false,
    })
    //  Get Role
    await swalQueue.fire({
      title: 'Please select your role',
      input: 'radio',
      inputOptions: {
        'Nutritionist': 'Nutritionist',
        'Client': 'Client',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
        role = value;
      }
    })
    object = { user_metadata: { role: role } }
  } else {
    const steps = ['1', '2', '3']
    const swalQueue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Next',
      confirmButtonColor: '#635dff',
      allowOutsideClick: false,
    })

    //  Get First Name
    await swalQueue.fire({
      title: "What's your first name?",
      input: "text",
      inputPlaceholder: 'Enter your first name',
      currentProgressStep: 0,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        firstName = value;
      }
    })

    //  Get Last Name
    await swalQueue.fire({
      title: "What's your last name?",
      input: "text",
      inputPlaceholder: 'Enter your last name',
      currentProgressStep: 1,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        lastName = value;
      }
    })

    //  Get Role
    await swalQueue.fire({
      title: 'Please select your role',
      input: 'radio',
      inputOptions: {
        'Nutritionist': 'Nutritionist',
        'Client': 'Client',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
        role = value;
      }
    })

    object = {
      given_name: firstName,
      family_name: lastName,
      user_metadata: { role: role }
    };
  }
  EditUser(user_id, object)
}

export function EditUser(user_id, object) {
  var options = {
    method: 'PATCH',
    url: 'https://foodboot.eu.auth0.com/api/v2/users/' + user_id,
    headers: {
      authorization: 'Bearer ' + auth0APItoken,
      'content-type': 'application/json'
    },
    data: object
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    SwalBottomToast2('success', 'Info saved successfully!');
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
}

export function removeUser(userData, logout) {
  Swal.fire({
    text: 'Are you sure you want to delete your profile?',
    showCancelButton: true,
    icon: 'error',
    iconColor: '#e55353',
    confirmButtonText: `Yes, delete it!`,
    confirmButtonColor: '#e55353'
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        var axios = require("axios").default;

        var options = {
          method: 'DELETE',
          url: 'https://foodboot.eu.auth0.com/api/v2/users/' + userData.user_id,
          headers: { authorization: 'Bearer ' + auth0APItoken }
        };

        axios.request(options).then(function (response) {
          console.log(response.data);
          SwalBottomToast2('success', 'Deleted successfully!');
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
      } catch (error) {
        console.log(error);
      }

      setTimeout(function () {
        logout({ returnTo: window.location.origin });
      }, 2000)
    }
  })
}