import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllKatas } from '../services/katasServices';
import { Kata } from '../utils/types/Kata.type';

const KatasPage = () => {
  
  let loggedIn = useSessionStorage('sessionJWTToken');
  let navigate = useNavigate();
  // State of component
  const [katas, setKatas] = useState([]) // initial katas is empty
  const [totalPages, setTotalPages] = useState(1) // initial default value
  const [currentPage, setCurrentPage] = useState(1) // initial default value

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login')
    } else {
      getAllKatas(loggedIn, 2, 1)
        .then((response: AxiosResponse) => {
          if (response.status === 200 && response.data.katas && response.data.currentPage && response.data.totalPages) {
              console.table(response.data);
              let { katas, totalPages, currentPage } = response.data;
              setKatas(katas);
              setTotalPages(totalPages);
              setCurrentPage(currentPage);
          } else  {
            throw new Error(`[Error obtaining katas]:${response.data} `);
            
          }
        })
        .catch((err) => console.error(`[GET ALL KATAS ERROR]: ${err}`))
    }
  }, [loggedIn])
  

  /**
   * method to navigate to kata details
   * @param {number} id of kata to navigate to
   */
  const navigateToKataDetail = (id:string) => {
    navigate(`/katas/${id}`)
  }

  return (
    <div>
      <h1>Katas page</h1>
      {
        katas.length > 0 ? 
        <div className="">
          
            {/* TODO export to osilated component */}
            {
              katas.map((kata:Kata) => (
                  <div key={kata._id}>
                    <h3 onClick={() => navigateToKataDetail(kata._id)}>{kata.name}</h3>
                    <h4>{kata.description}</h4>
                    <h5>Creator: {kata.creator}</h5>
                    <p>Rating: {kata.stars}/5</p>
                  </div>
                ))
            }
         
        </div>
        : 
        <div className="">
          <h5>No katas found</h5>
        </div>
      }
      
    </div>
  )
}

export default KatasPage