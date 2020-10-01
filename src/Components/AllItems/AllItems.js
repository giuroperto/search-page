import React, { useState, useEffect } from 'react';
import '../../css/AllItems.css';
import { Link } from 'react-router-dom';
import DadosDeliveryItems from '../../Dados/Delivery-Items';
import ScrollTop from '../Atom/Go-Up/Go-Up';

import { FaSearch, FaMotorcycle } from "react-icons/fa";

const ListaDeliveryItems = () => {

  const [ searchWord, setSearchWord ] = useState("");
  const [ search, setSearch ] = useState(false);
  const [ pageHeight, setPageHeight ] = useState(0);
  const [ type, setType ] = useState("DELIVERY");

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;

    setSearchWord(value);
    setSearch(true);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.scrollTo(0, 0);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      mounted = false
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, []);

  const handleScroll = (e) => {
    setPageHeight(document.documentElement.scrollTop);
  };

  const changeType = (e) => {
    e.preventDefault();

    const { value } = e.target;

    setType(value);
  };

  return(
    <div className="lista-items-delivery-container">
      <div className="header-lista-items-delivery">
        <Link to="/"><img className="logo" src="https://res.cloudinary.com/dxatyucj2/image/upload/v1597523783/Cantina/removebg-logo_yvoogc.png" alt="Logo Empório Roperto"/></Link>
        <div className="title">
          <h2>CONSULTAR ITEM ( {type} )</h2>
          { type === 'DELIVERY' && <FaMotorcycle className="icon"/> }
        </div>
      </div>
      <div className="toggle-btn">
        <input type="radio" name="type" value="DELIVERY" onClick={changeType} />
        <input type="radio" name="type" value="SALÃO" onClick={changeType} />
      </div>
      <div className="search-bar">
        <input type="text" value={searchWord} placeholder="Digite o nome do item" onChange={handleChange} />
        <FaSearch />
      </div>
      <div className="page-style">
      {
        search ? (
          type === 'DELIVERY' ? (
            DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_DELIVERY !== 0) && ((item.ITEM.toLowerCase().includes(searchWord.toLowerCase())) || (item.GROUP.toLowerCase().includes(searchWord.toLowerCase())))).map((item, idx) => (
              <div className="item" key={idx}>
                <h4>{item.ITEM}</h4>
                <p>{item.GROUP}</p>
                <p className="price">R$ {item.PRICE_DELIVERY}</p>
              </div>
            ))
          ) : (
            DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_MENU !== 0) && ((item.ITEM.toLowerCase().includes(searchWord.toLowerCase())) || (item.GROUP.toLowerCase().includes(searchWord.toLowerCase())))).map((item, idx) => (
              <div className="item" key={idx}>
                <h4>{item.ITEM}</h4>
                <p>{item.GROUP}</p>
                <p className="price">R$ {item.PRICE_MENU}</p>
              </div>
            ))
          )
        ) : (
          type === 'DELIVERY' ? (
            DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_DELIVERY !== 0)).map((item, idx) => (
              <div className="item" key={idx}>
                <h4>{item.ITEM}</h4>
                <p>{item.GROUP}</p>
                <p className="price">R$ {item.PRICE_DELIVERY}</p>
              </div>
            ))
          ) : (
            DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_MENU !== 0)).map((item, idx) => (
              <div className="item" key={idx}>
                <h4>{item.ITEM}</h4>
                <p>{item.GROUP}</p>
                <p className="price">R$ {item.PRICE_MENU}</p>
              </div>
            ))
          )
        )
      }
      </div>
      {
        pageHeight > 100 && (
          <div className="go-up">
            <ScrollTop />
          </div>
        )
      }
    </div>
  )
}

export default ListaDeliveryItems;

// search ? (
//           DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_DELIVERY !== 0) && ((item.ITEM.toLowerCase().includes(searchWord.toLowerCase())) || (item.GROUP.toLowerCase().includes(searchWord.toLowerCase())))).map((item, idx) => (
//             <div className="item" key={idx}>
//               <h4>{item.ITEM}</h4>
//               <p>{item.GROUP}</p>
//               <p className="price">R$ {item.PRICE_DELIVERY}</p>
//             </div>
//           ))
//         ) : (
//           DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_DELIVERY !== 0)).map((item, idx) => (
//             <div className="item" key={idx}>
//               <h4>{item.ITEM}</h4>
//               <p>{item.GROUP}</p>
//               <p className="price">R$ {item.PRICE_DELIVERY}</p>
//             </div>
//           )))