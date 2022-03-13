import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import ClientsTable from './ClientsTable';
import CIcon from '@coreui/icons-react';
import { mainUrl } from 'src/components/Common';
import { restApiGet } from 'src/api_calls/rest';
import { cidUserPlus } from '@coreui/icons-pro';

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

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Clients</strong>

          <CButton
            href='#/create-client'
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
      </CCard >
    </>
  )
}

export default withAuthenticationRequired(Clients)