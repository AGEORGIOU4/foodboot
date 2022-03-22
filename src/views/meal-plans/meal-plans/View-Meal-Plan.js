import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { useHistory } from 'react-router-dom';

const ViewMealPlan = (props) => {

  return (
    <>
      View Meal Plan
    </>
  )
}

export default withAuthenticationRequired(ViewMealPlan)