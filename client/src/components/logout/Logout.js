import './logout.css'


const Logout = () => {


    const handlelogout = ()=>{
        localStorage.clear();
        window.location.reload() ;
    }   

  return (
  <>
    <div className="logout">
        <button className="logoutButton" onClick={handlelogout}> Logout </button>
    </div>
  </>);
};

export default Logout;