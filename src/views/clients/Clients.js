import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CButton, CCard, CCardBody, CCardHeader, CLink } from '@coreui/react-pro'
import ClientsTable from './ClientsTable';
import { cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { mainUrl } from 'src/components/Common';
import { serverApiGet } from 'src/components/apiCalls/server';

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      serverApiGet(mainUrl + '/clients')
        .then(function (value) {
          setData(value);
          setLoading(false);
        }));
  }, []);

  return (
    <>
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
    </>
  )
}

export default withAuthenticationRequired(Clients)