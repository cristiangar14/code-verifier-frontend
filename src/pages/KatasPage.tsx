import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';

const KatasPage = () => {
  
  let loggedIn = useSessionStorage('sessionJWTToken');
  let navigate = useNavigate();


  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login')
    }
  }, [loggedIn])
  

  /**
   * method to navigate to kata details
   * @param {number} id of kata to navigate to
   */
  const navigateToKataDetail = (id:number) => {
    navigate(`/katas/${id}`)
  }

  return (
    <div>
      <h1>Katas page</h1>
      {/* TODO: Real katas */}
      <ul>
        {/* TODO export to osilated component */}
        <li onClick={() => navigateToKataDetail(1)}>
            first kata
        </li>
        <li onClick={() => navigateToKataDetail(2)}>
            Second kata
        </li>
      </ul>
    </div>
  )
}

export default KatasPage