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
  const [ order, setOrder ] = useState([]);
  const [ totalOrder, setTotalOrder ] = useState(0);

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
    const { value } = e.target;

    setType(value);
  };

  const saveItem = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    const adjValue = Number(value);

    const newItem = { name, adjValue };

    setOrder([...order, newItem]);
    setTotalOrder(totalOrder + adjValue);

    console.log(order);
    console.log(value);
    console.log(name);
    console.log(totalOrder);
    console.log(adjValue);
  };

  const resetCart = (e) => {
    e.preventDefault();
    setOrder([]);
    setTotalOrder(0);
  }

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
        <input type="radio" name="price-type" value="DELIVERY" onClick={changeType} />
        <input type="radio" name="price-type" value="SALÃO" onClick={changeType} />
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
                <button name={item.ITEM} value={item.PRICE_DELIVERY} onClick={saveItem}>ADICIONAR</button>
              </div>
            ))
          ) : (
            DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_MENU !== 0) && ((item.ITEM.toLowerCase().includes(searchWord.toLowerCase())) || (item.GROUP.toLowerCase().includes(searchWord.toLowerCase())))).map((item, idx) => (
              <div className="item" key={idx}>
                <h4>{item.ITEM}</h4>
                <p>{item.GROUP}</p>
                <p className="price">R$ {item.PRICE_MENU}</p>
                <button name={item.ITEM} value={item.PRICE_MENU} onClick={saveItem}>ADICIONAR</button>
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
                <button name={item.ITEM} value={item.PRICE_DELIVERY} onClick={saveItem} >ADICIONAR</button>
              </div>
            ))
          ) : (
            DadosDeliveryItems.filter((item) => (item.ACTIVE === "TRUE" || item.ACTIVE === "VERDADEIRO") && (item.PRICE_MENU !== 0)).map((item, idx) => (
              <div className="item" key={idx}>
                <h4>{item.ITEM}</h4>
                <p>{item.GROUP}</p>
                <p className="price">R$ {item.PRICE_MENU}</p>
                <button name={item.ITEM} value={item.PRICE_MENU} onClick={saveItem}>ADICIONAR</button>
              </div>
            ))
          )
        )
      }
      </div>
      {
        order && (
          <div className="cart">
          {
            order.map((el, idx) => {
              return (
                <div className="cart-item" key={idx}>
                  <p><span>{el.name}</span><span> R${el.adjValue}</span></p>
                </div>
              )
            })
          }
            <p className="total-order">R$ {totalOrder}</p>
            <button className="reset-order" onClick={resetCart}>RESET</button>
          </div>
        )
      }
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