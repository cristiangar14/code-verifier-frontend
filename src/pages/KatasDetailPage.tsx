import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'

// React Router Dom

import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../components/editor/Editor';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getKataById } from '../services/katasServices';
import { Kata } from '../utils/types/Kata.type';

const KatasDetailPage = () => {

  let loggedIn = useSessionStorage('sessionJWTToken');
  let navigate = useNavigate();
  //Find id from params
  let { id } = useParams();

  const [kata, setKata] = useState<Kata | undefined>(undefined)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login')
    } else {
      if (id) {
        getKataById(loggedIn, id)
          .then((response: AxiosResponse) => {
            if (response.status === 200 && response.data) {
              let { 
                  _id, 
                  name, 
                  creator, 
                  description,
                  intents,
                  level,
                  participants,
                  solution,
                  stars
                } = response.data; 
              
              let kataData: Kata = {
                  _id,
                  name,
                  creator,
                  description,
                  intents,
                  level,
                  participants,
                  solution,
                  stars
                }
                setKata(kataData);
                console.table(kataData)
            }
            

  
  
          })
          .catch((err) => console.error(`[KATA by Id error]: ${err}`))
        
      } else {
        return navigate('/katas')
      }
    }
  }, [loggedIn])
  




  return (
    <div>
      <h1>KatasDetailPage: {id}</h1>
      { kata ? 
        <div className="kata-data">
          <h2>{kata?.description}</h2> 
          <h3>Rating: {kata?.stars}/5 </h3>
          <button onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? 'Show Solution' : 'Hide Solution'}
          </button>
          {
            showSolution ? null : <Editor language='typescript'>{kata.solution}</Editor>

          }
        </div>
        : 
        <div className="">
          <h2>Loading kata...</h2>
        </div>
        
        }
      
      
    </div>
  )
}

export default KatasDetailPage