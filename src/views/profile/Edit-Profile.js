import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { CButton, CRow, CCol, CImage, CCard, CCardBody, CInputGroupText, CInputGroup, CFormInput, CFormSelect } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { CSpinner } from "@coreui/react-pro";
import { auth0ApiCall } from "src/components/apiCalls/auth0";

const EditProfile = props => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      auth0ApiCall('GET', 'https://foodboot.eu.auth0.com/api/v2/users', 'q:' + user.email, ", search_engine: 'v3'", true)
        .then(function (value) {
          setUserData(value);
          setLoading(false);
        }));
  }, []);

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard>
            <CCardBody style={{ display: (loading) ? "none" : "block" }}>

              <CCol md={12}>
                <CCol style={{ textAlign: 'center' }}>
                  <CImage src={(user.picture) ? user.picture : "avatar.png"}
                    width={80}
                    rounded={true}
                  />
                </CCol>

                <div style={{ width: "100%" }}>
                  <hr></hr>
                </div>

                <CInputGroup size="sm" className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-sm">Nickname</CInputGroupText>
                  <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder={userData.nickname} />
                </CInputGroup>

                <CInputGroup size="sm" className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-sm">First Name</CInputGroupText>
                  <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder={userData.given_name} />
                </CInputGroup>

                <CInputGroup size="sm" className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-sm">Last Name</CInputGroupText>
                  <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder={userData.family_name} />
                </CInputGroup>

                <CInputGroup size="sm" className="mb-3">
                  <CInputGroupText id="inputGroup-sizing-sm">Email</CInputGroupText>
                  <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder={userData.email} />
                </CInputGroup>

                <CInputGroup size="sm" className="mb-3">
                  <CInputGroupText component="label" htmlFor="inputGroupSelect01">Roles</CInputGroupText>
                  <CFormSelect id="inputGroupSelect01" >
                    <option>Choose...</option>
                    <option value="Nutritionist">Nutritionist</option>
                    <option value="Client">Client</option>
                  </CFormSelect>
                </CInputGroup>
              </CCol>

              <div style={{ width: "100%" }}>
                <hr></hr>
              </div>

              <CButton color="info" variant="outline">Edit <CIcon icon={cilPencil} /></CButton>

            </CCardBody>

            <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
              <CSpinner color='primary' variant='grow' />
            </CCardBody>

          </CCard>
        </CCol>
      </CRow >
    </>
  )
}

export default withAuthenticationRequired(EditProfile)