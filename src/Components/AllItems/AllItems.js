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

  return(
    <div className="lista-items-delivery-container">
      <div className="header-lista-items-delivery">
        <Link to="/"><img className="logo" src="https://res.cloudinary.com/dxatyucj2/image/upload/v1597523783/Cantina/removebg-logo_yvoogc.png" alt="Logo Empório Roperto"/></Link>
        <div className="title">
          <h2>CONSULTAR ITEM (DELIVERY)</h2>
          <FaMotorcycle className="icon"/>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" value={searchWord} placeholder="Digite o nome do item" onChange={handleChange} />
        <FaSearch />
      </div>
      <div className="page-style">
      {
        search ? (
          DadosDeliveryItems.filter((item) => (item.Item.toLowerCase().includes(searchWord.toLowerCase())) || (item.Group.toLowerCase().includes(searchWord.toLowerCase()))).map((item, idx) => (
            <div className="item" key={idx}>
              <h4>{item.Item}</h4>
              <p>{item.Group}</p>
              <p className="price">R$ {item.Price}</p>
            </div>
          ))
        ) : (
          DadosDeliveryItems.map((item, idx) => (
            <div className="item" key={idx}>
              <h4>{item.Item}</h4>
              <p>{item.Group}</p>
              <p className="price">R$ {item.Price}</p>
            </div>
          )))
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