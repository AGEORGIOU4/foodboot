import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CImage } from '@coreui/react-pro'
import ClientsTable from './ClientsTable';
import CIcon from '@coreui/icons-react';
import { mainUrl } from 'src/components/Common';
import { restApiGet, restApiPost } from 'src/api_calls/rest';
import { cidUserPlus } from '@coreui/icons-pro';
import SmartTableDownloadable from '../smart-table/SmartTableDownloadable';
import FileUploader from 'src/components/FileUploader';
import ClientsTableTemplate from './ClientsTableTemplate';
import Papa from "papaparse"
import { SwalMixin } from 'src/components/SweetAlerts/Swal';

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Set Clients
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients')
        .then(function (value) {
          setData(value);
          setLoading(false);
        }));
  }, []);

  const resetData = () => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients')
        .then(function (value) {
          setData(value);
          setLoading(false);
        }));
  }

  const handleFileChange = event => {
    let jsonObjArr = [];
    var obj = {};

    let last_name = "";
    let first_name = "";
    let dob = "";
    let gender = "";
    let email = "";
    let address = "";
    let phone = "";
    let food_allergies = "";

    const files = event.target.files;
    if (files) {
      Papa.parse(event.target.files[0], {
        complete: function (results) {
          if (results) {

            for (let i = 1; i < results.data.length - 1; i++) { // Remove first (headers) and last (empty) object from array
              obj = {};

              for (let j = 0; j < results.data[i].length; j++) {
                switch (j) {
                  case 0:
                    last_name = results.data[i][j]
                    break;
                  case 1:
                    first_name = results.data[i][j]
                    break;
                  case 2:
                    dob = results.data[i][j]
                    break;
                  case 3:
                    gender = results.data[i][j]
                    break;
                  case 4:
                    email = results.data[i][j]
                    break;
                  case 5:
                    phone = results.data[i][j]
                    break;
                  case 6:
                    address = results.data[i][j]
                    break;
                  case 7:
                    food_allergies = results.data[i][j]
                    break;
                  default:
                    break;
                }
              }
              obj = {
                "first_name": first_name,
                "last_name": last_name,
                "dob": dob,
                "gender": gender,
                "email": email,
                "phone": phone,
                "address": address,
                "food_allergies": food_allergies
              }
              jsonObjArr.push(obj);
            }

            // Import clients to db
            jsonObjArr.map(item => {
              Promise.resolve(
                restApiPost(mainUrl + '/clients/create/', item, false)
                  .then(function (value) {
                    SwalMixin('success', 'Clients imported!')
                    window.location.reload(false);
                    setLoading(false);
                  }).catch(function () {
                    setLoading(false);
                  }));
            })
            let newData = [...data, ...jsonObjArr];
            setData(newData)
          }
        }
      })
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Clients</strong>
          <CButton
            href='#/clients/create-client'
            className="me-1 float-end"
            size="sm"
            color='info'
            variant="ghost"
          ><CIcon icon={cidUserPlus} /> Create Client
          </CButton>

        </CCardHeader>
        <CCardBody>
          <ClientsTable data={data} loading={loading} resetData={resetData} />
        </CCardBody>
        <CCardFooter>

          <ClientsTableTemplate />
          <FileUploader handleFileChange={handleFileChange} />
          <SmartTableDownloadable data={data} />
        </CCardFooter>
      </CCard >
    </>
  )
}

export default withAuthenticationRequired(Clients)