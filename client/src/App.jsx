import React, { useState, useEffect } from 'react'

function App() {

  const [backendData, setBackendData] = useState([])

  useEffect(() => {
    fetch('/user')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBackendData(data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [])


  return (
    <div>
      <div>Yo yo yo</div>

      { (backendData.length === 0) ? (
        <div>Loading...</div>
      ) : (
        backendData.map((data, index) => (
          <div key={index}>
            <h1>{data.username}</h1>
            <p>{data.email}</p>
          </div>
        ))
      ) }



    </div>
  )
}

export default App