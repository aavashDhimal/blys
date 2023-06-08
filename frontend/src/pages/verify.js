import { useState, useRef,createContext } from "react";
import axios from "axios";
import '../App.css';

function VerifyPage({setIsVerified, isVerified}) {

  
  const [code, setCode] = useState(new Array(6).fill(''));
  const [invalid, setInvalid] = useState(new Array(6).fill(false));
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef([]);
  const [error, setError] = useState('');

  localStorage.setItem('isVerified', 'false');

  const handleChange = (e, index) => {
    let data = e.target.value
    if (isNaN(data)) {
      let newInvalid = [...invalid];
      
      newInvalid[index] = true;
      setInvalid(newInvalid);
      console.log(invalid[index])
      console.log(data, index, "not a num")
    }
    let newCode = [...code];
    newCode[index] = data;
    setCode(newCode);

    if (inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  }

  const handleBackSpace = (event, index) => {
    let newInvalid = [...invalid];
      
    newInvalid[index] = false;
    setInvalid(newInvalid);
    console.log(invalid[index])
    if (event.key === "Backspace" || event.key === "Delete") {
      if (index != 0) {
        setTimeout(() => inputsRef.current[index - 1].focus(), 0);
      }if(!code[index] && index!=0){
        setTimeout(() => inputsRef.current[index - 1].focus(), 0);

      }
    }


  }
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      setCode(pastedData.split(''));
      inputsRef.current[5].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const verificationCode = code.join('');
    console.log(isVerified,"verified");
      const response = await axios.post('http://localhost:3030/verify', { code: verificationCode });
      if (response.data.message === 'Success') {
        localStorage.setItem('isVerified', 'true');
        console.log(isVerified,"verr")
          window.location.href = '/success';
      }
   
  };

  console.log("console")
  return (
    <div className="App">
      <div className="form-wrapper">
        <h1 className="header">Verify Your code</h1>

        <form onSubmit={handleSubmit} className="verification-code-form">
          <h2 className="header">Enter your 6 Digit code</h2>

          <div className="input-boxes" >
            {code.map((digit, index) => (

              invalid[index] ? (
                <div className="invalid-input">

                  <input
                    key={index}
                    type="text"
                    ref={ref => inputsRef.current[index] = ref}
                    value={digit}
                    onKeyDown={(e) => handleBackSpace(e, index)}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={handlePaste}
                    maxLength="1"
                    required
                    className='verification-code-input'
                  />
                </div>
              ) : (
              <div className="valid-input" digit={digit} index={index}>
                <input
                  key={index}
                  type="text"
                  ref={ref => inputsRef.current[index] = ref}
                  value={digit}
                  onKeyDown={(e) => handleBackSpace(e, index)}
                  onChange={(e) => handleChange(e, index)}
                  onPaste={handlePaste}
                  maxLength="1"
                  required
                  className='verification-code-input'
                />
              </div>)
            ))}
          </div>
          <button type="submit" className="submit-button">Submit</button>
          {success &&<>
          <div className="checkmark"></div><br/>
              <div>Verification Success</div>
              </>
          }
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default VerifyPage;