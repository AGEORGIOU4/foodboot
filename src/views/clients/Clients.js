import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CLink, CCol } from '@coreui/react-pro'
import ClientsTable from './ClientsTable';
import { cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { mainUrl } from 'src/components/Common';
import { restApiGet } from 'src/components/apiCalls/rest';

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients')
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
        </CCardBody>
        <CCardFooter>
          <CLink disabled href='#/create-client'>
            <CCol md={12} style={{ textAlign: 'end' }}>
              <CButton variant='outline' color='info'>
                <CIcon icon={cilUserPlus} className="me-2" />
                Create Client
              </CButton>
            </CCol>
          </CLink>
        </CCardFooter>
      </CCard >
    </>
  )
}

export default withAuthenticationRequired(Clients)