import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CLink } from '@coreui/react-pro'
import ClientsTable from './ClientsTable';
import axios from 'axios';
import { cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { mainUrl } from 'src/components/Common';
import { SwalMixin } from 'src/components/SweetAlerts/Swal';

export default function Clients() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);

    axios.get(mainUrl + '/clients')
      .then((response) => {
        console.log(response.data)
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          console.log(error.response.data);
          SwalMixin('error', error.response.data.error);
        } else if (error.request) {
          setLoading(false);
          console.log(error.request);
          SwalMixin('error', error);
        }
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Clients</strong>
      </CCardHeader>
      <CCardBody>
        <ClientsTable data={data} loading={loading} />
        <CLink disabled href='#/create-client'>
          <CButton variant='outline' color='info'>
            <CIcon icon={cilUserPlus} className="me-2" />
            Create Client
          </CButton>
        </CLink>
      </CCardBody>
    </CCard >
  )
}
