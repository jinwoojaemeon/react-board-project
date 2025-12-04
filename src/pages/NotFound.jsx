import React from 'react'
import notFoundImage from '../resources/images/404Image.png'
import { NotFoundImage } from '../components/Layout.styled'

const NotFound = () => {
  return (
    <NotFoundImage src={notFoundImage} alt="404" />
  )
}

export default NotFound