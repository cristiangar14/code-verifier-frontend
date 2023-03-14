import React, { useEffect } from 'react'

// React Router Dom

import { useNavigate, useParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';

const KatasDetailPage = () => {

  let loggedIn = useSessionStorage('sessionJWTToken');
  let navigate = useNavigate();
  //Find id from params
  let { id } = useParams();

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login')
    }
  }, [loggedIn])
  




  return (
    <div>KatasDetailPage: {id}</div>
  )
}

export default KatasDetailPage