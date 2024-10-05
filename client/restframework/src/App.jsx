import { useState,useEffect } from 'react'
import CrudApp from './components/CrudApp'


function App() {

  // const[data,setData] = useState([]);
  // const[loading,setLoading] = useState(true);
  // const[error,setError] = useState(null);


  // useEffect(() =>{
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:8000');
  //       if (!response.ok){
  //         throw new Error('Network Response was not ok');
  //       }

  //       const result = await response.json();
  //       console.log(result);
  //       setData(...data,result);
      
  //     }catch(err){
  //       setError(err.message);
  //     }finally{
  //       setLoading(false);
  //     }

  //   };

  //   fetchData();
  // },[]);

  // if(loading) return <div>Loading</div>
  // if (error) return <div>error : {error}</div>





  return (
    <>
      {/* <h1> Jay jaga</h1>
      <div>
      <h1>Fetched Data:</h1>
      <ul>
        {data.map((item,index) => (
          <div>

            <li key={index}> <strong>name :</strong> {item.name} <br /> <strong>age: </strong>{item.age} </li><br />
          </div>
        ))}
      </ul>
    </div> */}

    <CrudApp/>

    </>
  )
}

export default App
