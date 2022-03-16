import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const MealPlanning = () => {
  return (
    <>
      <h1>Meal Planning</h1>
    </>
  )
}
export default withAuthenticationRequired(MealPlanning)
