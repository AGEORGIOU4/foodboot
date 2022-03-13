import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { CButton, CRow, CCol, CImage, CCard, CCardBody, CInputGroupText, CInputGroup, CFormInput, CFormSelect, CForm, CFormFeedback, CCardHeader } from "@coreui/react-pro";
import { CSpinner } from "@coreui/react-pro";
import { auth0ApiCall, EditUser } from "src/api_calls/auth0";
import { cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { SwalMixin } from "src/components/SweetAlerts/Swal";

const EditProfile = () => {
  const { user } = useAuth0();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  var userProfile = "";

  const [nickname, setNickname] = useState();
  const [given_name, setGiven_Name] = useState();
  const [family_name, setFamily_Name] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();

  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      auth0ApiCall('GET', 'https://foodboot.eu.auth0.com/api/v2/users', 'q:' + user.email, ", search_engine: 'v3'", true)
        .then(function (value) {
          setUserData(value);

          setNickname(value.nickname);
          setGiven_Name(value.given_name);
          setFamily_Name(value.family_name);
          setEmail(value.email)
          setRole(value.user_metadata.role)

          if (value.user_id.includes("google")) {
            setDisabled(true);
            SwalMixin('error', 'Google accounts cannot be modified')
          }
          setLoading(false);
        }));
  }, []);

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      userProfile = {
        given_name: given_name,
        family_name: family_name,
        email: email,
        user_metadata: { role: role }
      }

      // Update User
      if (!disabled) {
        setLoading(true);
        Promise.resolve(
          auth0ApiCall('GET', 'https://foodboot.eu.auth0.com/api/v2/users', 'q: ' + user.email + ', search_engine: v3', true)
            .then(function (value) {
              EditUser(userData.user_id, userProfile);
              setLoading(false);
            }))
        setValidated(true)
      }
    }
  }

  return (
    <>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
      >
        <CRow>
          <CCol md={12}>
            <CCard>

              <CCardHeader>
                <CSpinner color='dark' className="me-1 float-end" style={{ display: (loading) ? "block" : "none" }} variant='grow' />
                <strong>Edit Profile</strong>
                <CButton
                  disabled={loading}
                  className="me-1 float-end"
                  size="sm"
                  color='success'
                  variant="ghost"
                  onClick={handleSubmit}
                ><CIcon icon={cilSave} /> Save
                </CButton>
              </CCardHeader>

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
                    <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={nickname} disabled />
                    <CFormFeedback valid>Looks good!</CFormFeedback>
                  </CInputGroup>

                  <CInputGroup size="sm" className="mb-3">
                    <CInputGroupText id="inputGroup-sizing-sm">First Name</CInputGroupText>
                    <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={given_name} type="text" id="validationCustom02" required onChange={e => setGiven_Name(e.target.value)} disabled={disabled} />
                  </CInputGroup>

                  <CInputGroup size="sm" className="mb-3">
                    <CInputGroupText id="inputGroup-sizing-sm">Last Name</CInputGroupText>
                    <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={family_name} type="text" id="validationCustom02" required onChange={e => setFamily_Name(e.target.value)} disabled={disabled} />
                  </CInputGroup>

                  <CInputGroup size="sm" className="mb-3">
                    <CInputGroupText id="inputGroup-sizing-sm">Email</CInputGroupText>
                    <CFormInput aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={email} type="text" id="validationCustom03" required onChange={e => setEmail(e.target.value)} disabled={disabled} />
                  </CInputGroup>

                  <CInputGroup size="sm" className="mb-3">
                    <CInputGroupText component="label" htmlFor="inputGroupSelect01">Roles</CInputGroupText>
                    <CFormSelect id="inputGroupSelect01" required value={role} onChange={e => setRole(e.target.value)} disabled={disabled}>
                      <option>Choose...</option>
                      <option value="Nutritionist">Nutritionist</option>
                      <option value="Client">Client</option>
                    </CFormSelect>
                  </CInputGroup>
                </CCol>

                <div style={{ width: "100%" }}>
                  <hr></hr>
                </div>

              </CCardBody>

              <CCardBody style={{ textAlign: 'center', display: (loading) ? "block" : "none" }}>
                <CSpinner color='dark' variant='grow' />
              </CCardBody>

            </CCard>
          </CCol>
        </CRow >
      </CForm>
    </>
  )
}

export default withAuthenticationRequired(EditProfile)