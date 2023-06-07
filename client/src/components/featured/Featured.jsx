import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./featured.css";

const Featured = () => {

  const { data, loading  } = useFetch("http://localhost:8800/hotels/countByCity?cities=mumbai,goa,udaipur")

  // console.log(data)

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const today = new Date() ;
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date() ;
  // tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  

  
  const [dates, setDates] = useState([
    {
      startDate: today,
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  
  const {dispatch} = useContext(SearchContext)
  const navigate = useNavigate();

  const handleclick = (destination) =>{

      dispatch({type:"NEW_SEARCH" , payload:{destination , dates ,options }})
      navigate("/hotels", { state: { destination, dates, options } });
  }

  return (
    <div className="featured">
      {loading ? (
        "Loading Please Wait...."
      ) : (
        <>

          <button className="mainButton" onClick={() => {handleclick("mumbai")}}>
            <div className="featuredItem">
              <img
                src="https://t-cf.bstatic.com/xdata/images/city/540x270/971345.webp?k=9bf85dfa10a224e2855ca2f8ca3fcd96916a962d87cdfcc48d6d57c09bef3c65&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Mumbai</h1>
                <h2>{data[0]} properties</h2>
              </div>
            </div>
          </button>

          <button className="mainButton" onClick={() => {handleclick("goa")}}>
            <div className="featuredItem">
              <img
                src="https://t-cf.bstatic.com/xdata/images/region/square250/49646.webp?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Goa</h1>
                <h2>{data[1]} properties</h2>
              </div>
            </div>
          </button>

          <button className="mainButton" onClick={ () => {handleclick("udaipur")}}>
            <div className="featuredItem">
              <img
                src="https://t-cf.bstatic.com/xdata/images/city/square250/684938.webp?k=9d07ff707ce59768769b5e9a5381a4c705d921209dafd8fd0e2f1a6acdf0c68a&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Udaipur</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default Featured;
