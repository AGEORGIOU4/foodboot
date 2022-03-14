import React from 'react'
import { } from 'react-redux'
import { CFooter, } from '@coreui/react-pro'

const AppFooter = () => {
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
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
