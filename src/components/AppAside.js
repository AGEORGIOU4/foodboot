import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CAvatar,
  CCloseButton,
  CFormSwitch,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CListGroup,
  CListGroupItem,
  CSidebar,
  CSidebarHeader,
  CRow,
  CCol,
  CFormLabel,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilApple,
  cilInfo,
  cilList,
  cilMedicalCross,
} from '@coreui/icons'

import avatar from './../assets/images/avatars/avatar.png'
import { restApiGet } from 'src/api_calls/rest'
import { FormatTimestamp, mainUrl } from './Common'
import { CFoodPreference } from 'src/views/clients/clients/food-preferences/CFoodPreference'
import { cidApple } from '@coreui/icons-pro'
import { MedicalHistoriesViewTable } from 'src/views/clients/medical-histories/MedicalHistoriesViewTable'

const AppAside = (props) => {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState("");
  const [medical_history, setMedicalHistory] = useState("");

  const dispatch = useDispatch()
  const asideShow = useSelector((state) => state.asideShow)

  const [activeKey, setActiveKey] = useState(1)

  // Set Clients
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/' + props.client_id)
        .then(function (value) {
          setClient(value);

          setLoading(false);
        }));
  }, []);

  // Set Medical Histories
  React.useEffect(() => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/medical-histories/' + props.client_id)
        .then(function (value) {
          setMedicalHistory(value);

          setLoading(false);
        }));
  }, []);

  // Reset Medical Histories
  const resetData = () => {
    setLoading(true);
    Promise.resolve(
      restApiGet(mainUrl + '/clients/medical-histories/' + props.client_id)
        .then(function (value) {
          setMedicalHistory(value);
          setLoading(false);
        }));
  }

  return (
    <CSidebar
      colorScheme="light"
      size="lg"
      overlaid
      placement="end"
      visible={asideShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', asideShow: visible })
      }}
    >
      <CSidebarHeader className="bg-transparent p-0">
        <CNav variant="underline">
          <CNavItem>
            <CNavLink
              active={activeKey === 1}
              onClick={(e) => {
                e.preventDefault()
                setActiveKey(1)
              }}
            >
              <CIcon icon={cilApple} />
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink
              active={activeKey === 2}
              onClick={(e) => {
                e.preventDefault()
                setActiveKey(2)
              }}
            >
              <CIcon icon={cilList} />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeKey === 3}
              onClick={(e) => {
                e.preventDefault()
                setActiveKey(3)
              }}
            >
              <CIcon icon={cilInfo} />
            </CNavLink>
          </CNavItem>

          <CNavItem className="ms-auto me-2 d-flex align-items-center">
            <CCloseButton onClick={() => dispatch({ type: 'set', asideShow: false })} />
          </CNavItem>
        </CNav>
      </CSidebarHeader>

      <CTabContent>

        <CTabPane visible={activeKey === 1}>
          <CListGroup flush>
            <CListGroupItem className="list-group-item border-start-4 border-start-secondary bg-light text-center fw-bold text-medium-emphasis text-uppercase small">
              {client.first_name} {client.last_name}
            </CListGroupItem>
            <CListGroupItem>
              <div>
                <CFoodPreference client_id={props.client_id} />
              </div>
            </CListGroupItem>
            <CListGroupItem>
              <div>
                <CCol md={12}>
                  <CFormLabel style={{ fontWeight: 'bold' }}>Food allergies</CFormLabel>
                  <p>{client.food_allergies}</p>
                </CCol>
              </div>
            </CListGroupItem>
          </CListGroup>
        </CTabPane>

        <CTabPane visible={activeKey === 2}>
          <CListGroup flush>
            <CListGroupItem className="list-group-item border-start-4 border-start-secondary bg-light text-center fw-bold text-medium-emphasis text-uppercase small">
              {client.first_name} {client.last_name}
            </CListGroupItem>

            <CListGroupItem>
              <div>
                <MedicalHistoriesViewTable data={medical_history} loading={loading} resetData={resetData} display={false} />
              </div>
            </CListGroupItem>
          </CListGroup>
        </CTabPane>

        <CTabPane visible={activeKey === 3}>
          <CListGroup flush>
            <CListGroupItem className="list-group-item border-start-4 border-start-secondary bg-light text-center fw-bold text-medium-emphasis text-uppercase small">
              {client.first_name} {client.last_name}
            </CListGroupItem>
            <CListGroupItem>
              <CAvatar src={avatar} size="lg" className="float-end" />
              <div>
                <CRow>

                  <CCol md={12}>
                    <CFormLabel style={{ fontWeight: 'bold' }}>Date of birth</CFormLabel>
                    <p><FormatTimestamp date={client.dob} /></p>
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel style={{ fontWeight: 'bold' }}>Email</CFormLabel>
                    <p>{client.email}</p>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel style={{ fontWeight: 'bold' }}>Phone</CFormLabel>
                    <p>{client.phone}</p>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel style={{ fontWeight: 'bold' }}>Gender</CFormLabel>
                    <p>{client.gender}</p>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel style={{ fontWeight: 'bold' }}>Address</CFormLabel>
                    <p>{client.address}</p>
                  </CCol>
                </CRow>
              </div>
            </CListGroupItem>
          </CListGroup>
        </CTabPane>
      </CTabContent>
    </CSidebar>
  )
}

export default React.memo(AppAside)
