import React  from 'react'
import Carousel from 'react-multi-carousel';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


const WinesCategories = () => {
 
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
          {isDesktop ? (

      <Carousel responsive={responsive}>
        <div className='col-6'>
        <Link to="/whiskey" className="categories-card">
      <img src="https://images-platform.99static.com//FpGuw9Pl0LM03WfM5h86TWrukAE=/33x2:1231x1200/fit-in/590x590/99designs-contests-attachments/83/83197/attachment_83197126"
        alt=""/>
        <p>Whiskey</p>
      </Link>
        </div>
        <div className='col-6'>
     <div className="categories-card">
        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/national-tequila-day-design-template-735d1f895f575a6af1373f65bbab8f60.jpg?ts=1627103799"
        alt=""/>
        <p >Tequila</p>
      </div>
      </div> 
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://www.bing.com/th?id=OIP.B1Y_uk6cUHmtLLuSEJEzugHaHa&w=178&h=185&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
        alt=""/>
        <p>Champagne</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""/>
        <p>Liqueur</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://img.freepik.com/free-photo/closeup-cape-cod-cocktail-vodka-cranberry-blue_155003-6291.jpg?size=626&ext=jpg&ga=GA1.1.1688747696.1682599751&semt=sph"
        alt=""/>
        <p>Gin</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://i.etsystatic.com/39826203/r/il/5fe16b/4964536699/il_600x600.4964536699_ntzr.jpg"
        alt=""/>
        <p>Cognac</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://img.freepik.com/free-vector/realistic-illustration-with-golden-beer-splashing-swirling-transparent-glasses_1441-1807.jpg?size=626&ext=jpg&ga=GA1.1.1688747696.1682599751&semt=ais"
        alt=""/>
        <p>Beers</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://storage.googleapis.com/drinksvine/products/st-remy-xo.webp"
        alt=""/>
        <p>Brandy</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://storage.googleapis.com/drinksvine/products/old-monk-rum.webp"
        alt=""/>
        <p>Rum</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://images-platform.99static.com//9SmGtWSDyKLe9GbOsTZgqxFtm-0=/95x0:1186x1091/fit-in/500x500/99designs-contests-attachments/94/94962/attachment_94962993"
        alt=""/>
        <p>Vodka</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://storage.googleapis.com/drinksvine/products/blueberry-ice-yuoto-thanos.webp"
        alt=""/>
        <p>Vape</p>
      </div>
      </div>
      </Carousel>):(
      <div className='wines-cat'>
                <div className='col-6'>
        <Link to="/whiskey" className="categories-card">
      <img src="https://images-platform.99static.com//FpGuw9Pl0LM03WfM5h86TWrukAE=/33x2:1231x1200/fit-in/590x590/99designs-contests-attachments/83/83197/attachment_83197126"
        alt=""/>
        <p>Whiskey</p>
      </Link>
        </div>
        <div className='col-6'>
     <div className="categories-card">
        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/national-tequila-day-design-template-735d1f895f575a6af1373f65bbab8f60.jpg?ts=1627103799"
        alt=""/>
        <p >Tequila</p>
      </div>
      </div> 
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://www.bing.com/th?id=OIP.B1Y_uk6cUHmtLLuSEJEzugHaHa&w=178&h=185&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
        alt=""/>
        <p>Champagne</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""/>
        <p>Liqueur</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://img.freepik.com/free-photo/closeup-cape-cod-cocktail-vodka-cranberry-blue_155003-6291.jpg?size=626&ext=jpg&ga=GA1.1.1688747696.1682599751&semt=sph"
        alt=""/>
        <p>Gin</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://i.etsystatic.com/39826203/r/il/5fe16b/4964536699/il_600x600.4964536699_ntzr.jpg"
        alt=""/>
        <p>Cognac</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://img.freepik.com/free-vector/realistic-illustration-with-golden-beer-splashing-swirling-transparent-glasses_1441-1807.jpg?size=626&ext=jpg&ga=GA1.1.1688747696.1682599751&semt=ais"
        alt=""/>
        <p>Beers</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://storage.googleapis.com/drinksvine/products/st-remy-xo.webp"
        alt=""/>
        <p>Brandy</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://storage.googleapis.com/drinksvine/products/old-monk-rum.webp"
        alt=""/>
        <p>Rum</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://images-platform.99static.com//9SmGtWSDyKLe9GbOsTZgqxFtm-0=/95x0:1186x1091/fit-in/500x500/99designs-contests-attachments/94/94962/attachment_94962993"
        alt=""/>
        <p>Vodka</p>
      </div>
      </div>
      <div className='col-6'>
      <div className="categories-card">
        <img src="https://storage.googleapis.com/drinksvine/products/blueberry-ice-yuoto-thanos.webp"
        alt=""/>
        <p>Vape</p>
      </div>
      </div>
      </div>  
      )}
    </>
  )
}

export default WinesCategories