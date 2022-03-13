import React, { useState } from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useAuth0 } from "@auth0/auth0-react";
import { CButton, CRow, CCol, CImage, CCard, CCardBody, CCardHeader } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { CSpinner } from "@coreui/react-pro";
import { Link } from "react-router-dom";
import { auth0ApiCall, removeUser } from "src/components/apiCalls/auth0";
import { Route } from "react-router-dom";

const Profile = props => {
  const { user, logout } = useAuth0();
  const [loading, setLoading] = useState("false");

  const [userData, setUserData] = useState({
    "user_metadata": { "role": 'N/A' }
  });

  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      auth0ApiCall('GET', 'https://foodboot.eu.auth0.com/api/v2/users', 'q: ' + user.email + ', search_engine: v3', true)
        .then(function (value) {
          setUserData(value);
          setLoading(false);
        }));
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol className="me-1 float-end" md={12} style={{ textAlign: 'end' }}>
                <Route render={({ history }) => (
                  <CButton
                    className="me-1 float-end"
                    size="sm"
                    color='success'
                    variant="ghost"
                    onClick={() => { history.push({ pathname: "/edit-profile", state: userData }) }}
                  ><CIcon icon={cilPencil} /> Edit
                  </CButton>
                )} />
              </CCol>

            </CCardHeader>

            <CCardBody style={{ display: (loading) ? "none" : "block" }}>

              <CCol xs="12" style={{ textAlign: 'center' }}>
                <CImage src={(user.picture) ? user.picture : "avatar.png"}
                  width={80}
                  rounded={true}
                />
              </CCol>

              <CCol xs="12" style={{ textAlign: 'center', margin: '12px 0 6px' }}>
                <strong style={{ fontSize: 'large' }}> {user.nickname}</strong>
              </CCol>

              <div style={{ width: "100%" }}>
                <hr></hr>
              </div>

              <div>
                <CCol style={{ padding: "10px" }}>
                  <span><strong>Name:</strong></span> {userData.given_name} {userData.family_name}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Email:</strong></span> {userData.email}
                </CCol>

                <CCol style={{ padding: "10px" }}>
                  <span><strong>Role:</strong></span> {userData.user_metadata.role}
                </CCol>
              </div>

              <div style={{ width: "100%" }}>
                <hr></hr>
              </div>

              <CCol style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Link to="/profile" style={{ fontSize: 'small', color: '#e55353' }} onClick={() => removeUser(userData, logout)}> Permanently delete your account</Link>
              </CCol>
            </CCardBody>

            <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
              <CSpinner color='dark' variant='grow' />
            </CCardBody>

          </CCard>
        </CCol>
      </CRow >
    </>
  )
}
export default withAuthenticationRequired(Profile)