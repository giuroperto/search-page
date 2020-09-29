import React from 'react';
import '../../../css/Go-Up.css';

import { IoIosArrowDropupCircle } from "react-icons/io";


const scrollTop = () => {

  const getToTheTop = (e) => {
    window.scrollTo(0, 0);
  }

  return(
    <div className="go-up-container">
      <button onClick={getToTheTop}><IoIosArrowDropupCircle className="icon" /></button>
    </div>
  )
}

export default scrollTop;