import React from 'react'
import { } from 'react-redux'
import { CFooter, CImage, } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter style={{ background: '#d9dce0' }}>
      <div >
        <a href="https://github.com/AGEORGIOU4/foodboot-frontend" target="_blank" rel="noopener noreferrer">
          <CImage src='foodboot-logo-landscape.png' height={'31px'} />
        </a>
        <span className="ms-1">&copy; 2022 UCLan Cyprus.</span>
      </div>

      <div className="ms-auto" style={{ margin: '0px 20px' }}>
        <span className="me-1"><small>Powered by</small></span>
        <a href="https://www.linkedin.com/in/ageorgiou4/" style={{ textDecoration: 'none', color: '#007bff' }} target="_blank" rel="noopener noreferrer">
          <strong><small>Andreas Georgiou</small></strong>
        </a>
      </div>
      <div>
      </div>
    </CFooter >
  )
}

export default React.memo(AppFooter)
