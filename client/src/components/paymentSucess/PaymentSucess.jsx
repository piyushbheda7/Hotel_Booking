import { useNavigate,useSearchParams  } from "react-router-dom"
import "./paymentsucess.css"
import { SearchContext } from '../../context/SearchContext';
import { useContext} from 'react';
import useFetch from '../../hooks/useFetch';


const PaymentSucess=()=>{
    
    const {dispatch} = useContext(SearchContext)
    const navigate=useNavigate()
    const searchquery=useSearchParams()[0]
    const id=searchquery.get("id")
    // console.log(id)
    const searchquery1=useSearchParams()[0]
    const amount=searchquery1.get("amount")
    // console.log(amount)
    const reference=searchquery1.get("reference_no")
    // console.log(reference)
 
    const { data } = useFetch(`http://localhost:8800/hotels/find/${id}`)
    const city=data.city
    // console.log(city)
    const { dates, options } = useContext(SearchContext);
    // console.log(options)
   
    const handlePdf = () =>{

        dispatch({type:"NEW_SEARCH" , payload:{id,city,amount,dates ,options }})
        navigate(`/Pdf/${reference}`, { state: {id,city,amount,dates, options } });
    }
    const handleclick=()=>{
        navigate("/")
    }
    return(
        <div className="container">
            <div className="Imgcontainer">
                <img src="https://www.reocharitablefoundation.com/advantageopen/assets/img/success-icon-green.png" alt="sucessImg" className="SImg" />

            </div>
            <div className="DetailInfo">
                <h1>Thank You</h1>
                <h4>Payment done sucessfully</h4>
                <p>You Will be redirect to home page shortly or click here to return Home page</p>
                <button onClick={handleclick}>Home</button><span> </span>
                <button onClick={handlePdf}>Genarate Pdf</button>
            </div>

        </div>
    )
}
export default PaymentSucess