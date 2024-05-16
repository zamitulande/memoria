import {useRef} from 'react'
import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = ({onChange}) => {

    const  recaptcha = import.meta.env.VITE_RECAPTCHA_KEY;

    const recaptchaRef = useRef(null);

    const handleChange =(value)=>{
        if (onChange) {
            onChange(value);
          }
    }
  return (
    <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={recaptcha}
        onChange={handleChange}
    />
  )
}

export default Recaptcha