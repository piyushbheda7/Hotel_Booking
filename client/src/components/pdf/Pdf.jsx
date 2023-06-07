import axios from "axios"

import  { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./pdf.css"

const Pdf = () => {
const location=useLocation()
// console.log(location)

// const[end,setEnd]=useState(location.state.dates[0].endDate)
// const[start,setStart]=useState(location.state.dates[0].startDate)
const[username,setusername]=useState();
const[email,setemail]=useState();
const[number,setnumber]=useState();
const[name,setname]=useState()
const[city,setcity]=useState()
const[type,settype]=useState()
const[add,setadd]=useState()
const id=location.state.id
const amount=location.state.amount
const navigate = useNavigate()
// console.log(start,end)
const DeatilFetch=async()=>{
   const res=await axios.get(`http://localhost:8800/hotels/find/${id}`)
   setname(res.data.name)
   setcity(res.data.city)
   settype(res.data.type)
   setadd(res.data.address)
   
}
useEffect(()=>{
    const res=JSON.parse(localStorage.getItem('user'))
    setusername(res.username)
    setemail(res.email)
    setnumber(res.number)
   DeatilFetch()
})

const handleprint = () => {
    window.print() ;
    navigate("/")
}


    return (

        <div className="PdfContainer">
           
                <div className="PDfTitle">
                    <h1>BOOKING CONFIRMATION</h1>
                </div>
                <div className="slip">
                    <div className="DescTitle">
                        <div className="title">
                            <h1>Online Hotel Booking</h1>
                        </div>
                        <div className="personDeatil">
                            <p>Username:{username}</p>
                            <p>Email Id:{email}</p>
                            <p>Mobile no-{number}</p>
                        </div>
                        <div className="DeatilHotel">
                            <p>Hotel Name:{name}</p>
                            <p>Type: {type}</p>
                            <p>City: {city}</p>
                            <p>Address:{add}</p>
                        </div>
                        <div className="DatailP">
                            <p>payement id:8905895848504</p>
                            <p>TOTAL PAID AMOUNT:{amount}</p>
                        </div>
                        <div className="thanlblock">
                            <h2>THANK YOU.....</h2>
                            <h2>HAVE A GREAT DAY..</h2>
                        </div>
                        <div className="button">
                            <button onClick={handleprint}>Print</button>
                        </div>
                        
                    </div>
                </div>
           
            </div>
        
    )
}
export default Pdf;