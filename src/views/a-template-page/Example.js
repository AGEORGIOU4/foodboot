import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const Example = () => {
  return (
    <h1>Nutrition Facts</h1>
  )
}
export default withAuthenticationRequired(Example)
