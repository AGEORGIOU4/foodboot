import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CButtonGroup, CFooter, CFormCheck, CHeaderNav } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMoon, cilSun } from '@coreui/icons'

const AppFooter = () => {
  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const asideShow = useSelector((state) => state.asideShow)

  return (
    <CFooter>
      <div>
        <a href="https://github.com/AGEORGIOU4/foodboot-frontend" target="_blank" rel="noopener noreferrer">
          foodboot
        </a>
        <span className="ms-1">&copy; 2022 UCLan Cyprus.</span>
      </div>
      <div className="ms-auto" style={{ margin: '0px 20px' }}>
        <span className="me-1">Powered by</span>
        <a href="https://www.linkedin.com/in/ageorgiou4/" target="_blank" rel="noopener noreferrer">
          Andreas Georgiou
        </a>
      </div>
      <div>
        <CHeaderNav className="ms-auto me-4">
          <CButtonGroup aria-label="Theme switch">
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-light-theme"
              autoComplete="off"
              label={<CIcon icon={cilSun} />}
              checked={theme === 'default'}
              onChange={() => dispatch({ type: 'set', theme: 'light' })}
            />
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-dark-theme"
              autoComplete="off"
              label={<CIcon icon={cilMoon} />}
              checked={theme === 'dark'}
              onChange={() => dispatch({ type: 'set', theme: 'dark' })}
            />
          </CButtonGroup>
        </CHeaderNav>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
