import '../App.css';
import { useNavigate,Link } from "react-router-dom";
import { useEffect } from 'react';

function SuccessPage (){
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('isVerified') !== 'true') {
            navigate('/');
        }
    }, []);
    

    return(
        <div className='App'>
        <div className="circle">
          <div className="checkmark"></div>
          <div className="message">Verification Success</div>
          <div className='go-back'><Link to = '/' >Go Back</Link></div>

        </div>

      </div>

    )
}

export default SuccessPage;