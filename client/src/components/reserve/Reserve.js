import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Reserve = ({ setOpen, hotelId, cheapestPrice, days }) => {

  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`http://localhost:8800/hotels/room/${hotelId}`);
  const { dates , options } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);


  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  
  const [price , setprice] = useState(0)

  const handleSelect = ( e , itemPrice ) => {


    const checked = e.target.checked;
    const value = e.target.value;

    if(checked){
      setprice(price+itemPrice)
    }
    else{
      setprice(price-itemPrice)
    }


    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );

    
  };


  const { user } = useContext(AuthContext)


  const handlePayment = async () => {

    console.log(selectedRooms)
    
    if (selectedRooms.length !== options.room) {
      window.alert("Please Select Rooms as per you Searched!")
    }
    else {
      
      let result = await fetch("http://localhost:8800/payment/checkout", {
        method: 'post',
        body: JSON.stringify({ amount: price * days }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      let result1 = await result.json()
      // console.log(result1)

      const options = {
        key: "rzp_test_eNL7TM2ewujQVh", // Enter the Key ID generated from the Dashboard
        amount: price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: `${user.username}`,
        description: "Test Transaction",
        order_id: result1.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `http://localhost:8800/payment/paymentverification/${hotelId}/${price}`,
        prefill: {
          name: `${user.username}`,
          email: `${user.email}`,
          contact: `${user.number}`,
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#003580"
        }
      };


      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      try {
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(`http://localhost:8800/rooms/availability/${roomId}`, {
              dates: alldates,
            });
            return res.data;
          })
        );
        setOpen(false);
      } catch (err) { }

    }

  };


  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">₹ {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber, i) => (
                <div className="room" key={i}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={event => handleSelect(event, item.price)    }
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handlePayment} className="rButton">
          Pay Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
