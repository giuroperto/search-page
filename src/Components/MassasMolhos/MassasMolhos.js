import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";

import '../../css/MassasMolhos.css';
import dadosCardapio from '../../Dados/DadosCardapio';
import ScrollTop from '../Atom/Go-Up/Go-Up';

const MassasMolhos = () => {

  const [ category, setCategory ] = useState("");
  const [ showRestrictions, setShowRestrictions ] = useState("");
  const [ pageHeight, setPageHeight ] = useState(0);

  const getCategory = (e) => {
    const { value } = e.target;

    setCategory(value);
    setShowRestrictions("icons-desc show");
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setCategory('Massas e Molhos');
      window.scrollTo(0, 0);
      setShowRestrictions("icons-desc no-show");
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      mounted = false;
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);


  const handleScroll = (e) => {
    setPageHeight(document.documentElement.scrollTop);
  };
  
  return(
    <div className="massas-molhos-container">
      <div className="header-massas-molhos">
        <Link to="/cardapio" className="link-style"><RiArrowGoBackLine className="icon"/></Link>
        <Link to="/"><img className="logo" src="https://res.cloudinary.com/dxatyucj2/image/upload/v1597523783/Cantina/removebg-logo_yvoogc.png" alt="Logo Empório Roperto"/></Link>
        <h2>{category}</h2>
      </div>
      <div className="description">
        <p>Selecionar opção desejada abaixo.</p>
        <p className="bold">Preço do prato = massa + molho.</p>
      </div>
      <div className="page-style">
        <div className={showRestrictions}>
          <span>
            <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099682/Cantina/vegan_ugs6kj.png" alt="icone vegano"/> Vegano
          </span>
          <span>
            <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099346/Cantina/Vegetarian_b47gnj.png" alt="icone vegetariano"/> Vegetariano
          </span>
          <span>
            <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099349/Cantina/Gluten_Free_dym0vn.png" alt="icone gluten free"/> Gluten Free
          </span>
          <span>
            <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099351/Cantina/Dairy_Free_vvghrz.png" alt="icone sem leite"/> Sem Lactose
          </span>
          <span>
            <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599100155/Cantina/Egg_Free_1_smezmj.png" alt="icone sem ovo"/> Sem Ovo
          </span>
        </div>
        <div className="toggle-button">
          <input type="radio" name="pasta" value="Massas" onClick={getCategory} />
          <input type="radio" name="pasta" value="Massas Especiais" onClick={getCategory} />
          <input type="radio" name="pasta" value="Molhos" onClick={getCategory} />

{/* <input type="radio" name="sex" value="f" data-icon='' />
<input type="radio" name="sex" value="m" data-icon='' /> */}

        </div>
        <div className="items-cards">
          {/* renderizando cardapio completo por categoria alimentar */}
          {
            dadosCardapio.pt.filter((item) => ( item.Active === "TRUE" || item.Active === "VERDADEIRO") && ( item.Cardapio === "TRUE" || item.Cardapio === "VERDADEIRO") && item.Group === category).map((item, idx) => (
              <div className="cardapio-item" key={idx}>
                <h4>{item.Dish_Name}</h4>
                {/* colocar icones de cada filtro de prato */}
                <div className="ingredients">
                  {item.isVegan === "TRUE" && <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099682/Cantina/vegan_ugs6kj.png" alt="icone vegano"/>}
                  {item.isVegetarian === "TRUE" && <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099346/Cantina/Vegetarian_b47gnj.png" alt="icone vegetariano"/>}
                  {item.isGlutenFree === "TRUE" && <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099349/Cantina/Gluten_Free_dym0vn.png" alt="icone gluten free"/>}
                  {item.hasNotMilk === "TRUE" && <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599099351/Cantina/Dairy_Free_vvghrz.png" alt="icone sem leite"/>}
                  {item.hasNotEgg === "TRUE" && <img src="https://res.cloudinary.com/dxatyucj2/image/upload/v1599100155/Cantina/Egg_Free_1_smezmj.png" alt="icone sem ovo"/>}
                </div>
                <img src={item.Picture} alt={item.Dish_Name}/>
                <p>{item.Description}</p>
                <p className="price">+ R$ {item.Price}</p>
                {
                  item.Price_2 && <p className="price">Tamanho Maior: R$ {item.Price_2}</p>
                }
              </div>
            ))
          }
        </div>
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

export default MassasMolhos;