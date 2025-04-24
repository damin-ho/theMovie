import axios from "axios";
import { useEffect, useState } from "react";
import { DiGhostSmall } from "react-icons/di";



export const Todo = () => {

    // const fruits = [
    //     'Apple',
    //     'Mango',
    //     'Pineapple',
    //     'Cashew',
    //     'Watermelon'
    // ]

    // const [search, setSearch] = useState('')
    // const [count, setCount] = useState(0)

    // const filteredData = fruits.filter((fruit) => fruit.toLocaleLowerCase().includes(search.toLocaleLowerCase()))



    // const handleChange = (e) =>{
    //     setSearch(e.target.value)
    // }
 
    // const increase = () =>{
    //     setCount((count)=> count += 1)
    // }

    const [ theData, setTheData ] = useState([])
    const [ theSearch, setTheSearch ] = useState()
    
    let myData = "https://jsonplaceholder.typicode.com/posts"
    let filteredId = theData.filter((info) => info.userId === Number(theSearch))
    const fetchData = async () => {
        try{
            let toFetch = await axios.get(myData)
            console.log(toFetch)
            setTheData(toFetch.data)
        } catch(err){
           console.log(err)
        }
   }

   const handlechange = (e) =>{
         setTheSearch(e.target.value)
   }

return <div>

       <input placeholder="Search UserId" onChange={handlechange} style={{border:"1px solid red", margin:"20px"}}/>
       <button onClick={fetchData} style={{border:"1px solid red", margin:"20px"}}>Fetch</button>
       <div>
            {filteredId.map((data) =>{
             return <div>
                 <div style={{border:"1px solid red", margin:"20px"}}>
                      <h3>{data.userId}</h3>
                      <h3>{data.id}</h3>
                      <h2>{data.title}</h2>
                      <h3>{data.body}</h3>
                 </div>
             </div>
            })}
       </div>


</div>
}