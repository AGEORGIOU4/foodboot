import React, { useState } from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import UsersTable from './UsersTable';
import { auth0ApiCall } from 'src/api_calls/auth0';

const Users = () => {
  const [data, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);

    Promise.resolve(
      auth0ApiCall('GET', 'https://foodboot.eu.auth0.com/api/v2/users', 'search_engine: v3', false)
        .then(function (value) {
          setUsers(value);
          setLoading(false);
        }));
  }, []);

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Users</strong>
      </CCardHeader>
      <CCardBody>
        <UsersTable data={data} loading={loading} />
      </CCardBody>
    </CCard >
  )
}

export default withAuthenticationRequired(Users)