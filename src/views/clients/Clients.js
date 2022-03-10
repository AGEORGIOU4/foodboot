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

          <CButton
            href='#/create-client'
            className="me-1 float-end"
            size="sm"
            color='success'
            variant="ghost"
          ><CIcon icon={cilUserPlus} /> Create
          </CButton>

        </CCardHeader>
        <CCardBody>
          <ClientsTable data={data} loading={loading} />
        </CCardBody>
      </CCard >
    </>
  )
}

export default withAuthenticationRequired(Clients)