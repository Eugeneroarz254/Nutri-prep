import React from 'react'
import {AiOutlineRight} from "react-icons/ai"
import {AiOutlineLeft} from "react-icons/ai"
import { Link } from "react-router-dom";


const Sidenav = () => {
  return (
   <>
        <div className="banners1"
          id="banners1">
     
       
        <Link to="apparel" className="li"
        id="sidenavRow">
          <img src="images/Shirt.png" alt="icons"/>
        <div className="w-100  d-flex align-items-center justify-content-between">
        <b>Apparel</b>
          <AiOutlineRight/>
        </div>
        <div id="sub-container">
         <div>
          <h3>Men's clothing</h3>
          <ul>
            <li><Link to="apparel">Men's Shirts</Link></li>
            <li><a href="">Men's Hoodies & Sweatshirts</a> </li>
            <li><a href="">Men's Sweaters</a> </li>
            <li><a href="">Men's Pants & Trousers</a> </li>

          </ul>
         </div>
         <div>
          <h3>Trending Collection</h3>
          <ul>
            <li><a href="">Retro Sweatpants</a> </li>
            <li><a href="">Cargo Sweatpants</a> </li>
            <li><a href="">Vintage Collection</a> </li>
            <li><a href="">Dior Hoodies</a> </li>

          </ul>
         </div>
         <div>
          <h3>Women's Clothing</h3>
          <ul>
          <li><a href="">Women's Jackets</a> </li>
            <li><a href="">Women's Hoodies & Sweatshirts</a> </li>
            <li><a href="">Women's Sweaters</a> </li>
            <li><a href="">Women's Pants & Trousers</a> </li>

          </ul>
         </div>
         <div >
          <h3>Other Apparel</h3>
          <ul>
          <li><a href="">Apparel Store</a> </li>
            <li><a href="">Think twice</a> </li>
            <li><a href="">Other Apparel</a> </li>
            <li><a href="">Pants & Trousers</a> </li>

          </ul>
         </div>
        </div>
        </Link>

        <Link to="phones-accessories" className="li"
        id="sidenavRow">
          <img src="https://img.freepik.com/premium-vector/smartphone-mockup_66219-655.jpg?w=740" alt="icons"/>
          <div className="w-100  d-flex align-items-center justify-content-between">
          <b>Phones & Accessories</b>
          <AiOutlineRight/>
          </div>
          <div id="sub-container">
         <div>
          <h3>Mobile Phones</h3>
          <ul>
            <li><Link to="apparel">Smart Phones</Link></li>
            <li><a href="">Featured Phones</a> </li>


          </ul>
         </div>
         <div>
          <h3>Tablets</h3>
          <ul>
            <li><a href="">Tablets</a> </li>
            <li><a href="">Tablet Accessories</a> </li>

          </ul>
         </div>
         <div>
          <h3>Refurbished Corner</h3>
          <ul>
          <li><a href="">Refurbished Phones</a> </li>
            <li><a href="">Refurbished Tablets</a> </li>
    
          </ul>
         </div> 
         <div>
          <h3>Accessories</h3>
          <ul>
          <li><a href="">Portable Powerbanks</a> </li>
            <li><a href="">Smart Watches</a> </li>
            <li><a href="">Screen Protectors</a> </li>
            <li><a href="">Cases & Sleeves</a> </li>
            <li><a href="">Bluetooth Accessories</a> </li>
            <li><a href="">Batteries & Battery Packs</a> </li>
            <li><a href="">Virtual Reality Headsets</a> </li>
            <li><a href="">Mount & Stands</a> </li>

          </ul>
         </div>
         <div>
          <h3>Brands</h3>
          <ul>
          <li><a href="">Samsung</a> </li>
            <li><a href="">Xiaomi</a> </li>
            <li><a href="">Nokia</a> </li>
            <li><a href="">Tecno</a> </li>
            <li><a href="">Infinix</a> </li>
            <li><a href="">Oppo</a> </li>
            <li><a href="">Itel</a> </li>
            <li><a href="">Vivo</a> </li>

          </ul>
         </div> 

        </div>
        </Link>
        <Link to="tv-audio-systems" className="li"
        id="sidenavRow">
          <img src="https://img.freepik.com/premium-photo/there-is-tv-speakers-front-tv-generative-ai_958138-12850.jpg?w=740" alt="icons"/>
          <div className="w-100  d-flex align-items-center justify-content-between">
          <b>Tv's & Audio Systems </b>
          <AiOutlineRight/>
          </div>
          <div id="sub-container">
         <div>
          <h3>Televisions</h3>
          <ul>
            <li><Link to="apparel">Smart Tv's</Link></li>
            <li><a href="">Digital Tv's</a> </li>
 
          </ul>
         </div>
         <div>
          <h3>Home Audio</h3>
          <ul>
            <li><a href="">Speakers</a> </li>
            <li><a href="">Home Theatre Systems</a> </li>
            <li><a href="">Bluetooth Speakers</a> </li>
            <li><a href="">Compact Radio & Stereos</a> </li>
            <li><a href="">HI-FI Systems</a> </li>

          </ul>
         </div>
     
         <div>
          <h3>Tv Accessories</h3>
          <ul>
          <li><a href="">Tv Accessories</a> </li>
            <li><a href="">Cables</a> </li>
            <li><a href="">Extensions</a> </li>
            <li><a href="">Security Surveillance</a> </li>
            <li><a href="">Batteries</a> </li>
            <li><a href="">Decorders</a> </li>

          </ul>
         </div> 

         <div>
          <h3>TV Brands</h3>
          <ul>
          <li><a href="">Vitron</a> </li>
            <li><a href="">TCL</a> </li>
            <li><a href="">Hisense</a> </li>
            <li><a href="">Skyworth</a> </li>
            <li><a href="">Vitron Plus</a> </li>
            <li><a href="">Samsung Tv</a> </li>
            <li><a href="">GLD</a> </li>
            <li><a href="">LG</a> </li>

          </ul>
         </div>
    
        </div>
          </Link>

          <Link to="appliances" className="li"
        id="sidenavRow">
          <img src="https://img.freepik.com/free-vector/realistic-kitchen-appliance_52683-83665.jpg?t=st=1712900596~exp=1712904196~hmac=404dde597aa0129729733fd452154d4a6ff254032cb261b5e729f73a3cf0f5a8&w=826" alt="icons"/>
          <div className="w-100  d-flex align-items-center justify-content-between">
          <b>Appliances</b>
          <AiOutlineRight/>
          </div>
          <div id="sub-container">
         <div>
          <h3>Cooking Appliances</h3>
          <ul>
            <li><Link to="shoes">Microwaves</Link></li>
            <li><a href="">Freestanding Cookers</a> </li>
            <li><a href="">Ovens</a> </li>
            <li><a href="">Cooker Hoods</a> </li>

          </ul>
         </div>
         <div>
          <h3>Kitchen Appliances</h3>
          <ul>
            <li><a href="">Kettle</a> </li>
            <li><a href="">Toasters, Sandwich & Bread Makers</a> </li>
            <li><a href="">Coffee Makers</a> </li>
            <li><a href="">Blenders</a> </li>

          </ul>
         </div>
  
         <div>
          <h3>Cleaning Appliances</h3>
          <ul>
          <li><a href="">Steam Cleaners</a> </li>
            <li><a href="">Vacuum Cleaners</a> </li>
            <li><a href="">High Pressure Washers</a> </li>
            <li><a href="">Cleaning Accessories</a> </li>

          </ul>
         </div> 
         <div>
          <h3>Fridges</h3>
          <ul>
          <li><a href="">Side by side Fridges</a> </li>
            <li><a href="">French Door</a> </li>
            <li><a href="">Ice Makers</a> </li>
            <li><a href="">Bevarage Cooler</a> </li>
            <li><a href="">Wine Cooler</a> </li>
            <li><a href="">Bar Fridges</a> </li>
            <li><a href="">Bottom Freezer</a> </li>
            <li><a href="">Top Freezer</a> </li>

          </ul>
         </div>
         <div>
          <h3>Laundry</h3>
          <ul>
          <li><a href="">Dishwashers</a> </li>
            <li><a href="">Washing Machine</a> </li>
            <li><a href="">Tumble Dryers</a> </li>

          </ul>
         </div> 

         <div>
          <h3>Brands</h3>
          <ul>
          <li><a href="">Philips</a> </li>
            <li><a href="">Ramtons</a> </li>
            <li><a href="">Roch</a> </li>
            <li><a href="">Hisense</a> </li>
            <li><a href="">Mika</a> </li>
            <li><a href="">Binatone</a> </li>
            <li><a href="">Von</a> </li>
            <li><a href="">Nexus</a> </li>

          </ul>
         </div> 
        </div>
          </Link>

          <Link to="computer-accessories" className="li"
        id="sidenavRow">
          <img src="https://img.freepik.com/free-psd/computer-mockup_1310-706.jpg?t=st=1712900904~exp=1712904504~hmac=e1a89bafc75ff3dfbfd3545cb7c8c386189488b80b4260ace69168c7647eb06a&w=740" alt="icons"/>
          <div className="w-100  d-flex align-items-center justify-content-between">
          <b>Computing & Accessories</b>
          <AiOutlineRight/>
          </div>
          <div id="sub-container">
         <div>
          <h3>Laptops</h3>
          <ul>
            <li><Link to="apparel">Mini Laptops & Netbooks</Link></li>
            <li><a href="">Notebooks</a> </li>
            <li><a href="">Ultrabooks</a> </li>
            <li><a href="">Hybrid PC</a> </li>
            <li><a href="">Macbooks</a> </li>

          </ul>
         </div>
         <div>
          <h3>Printers, Scanners & Accessories</h3>
          <ul>
            <li><a href="">Printers</a> </li>
            <li><a href="">Scanners</a> </li>
            <li><a href="">Ink, Toners & Cartridges</a> </li>

          </ul>
         </div>
         <div>
          <h3>Computing Accessories</h3>
          <ul>
          <li><a href="">Laptop Accessories</a> </li>
            <li><a href="">Laptop Bags</a> </li>
            <li><a href="">Computer Cable & Adapters</a> </li>
            <li><a href="">Printer Ink</a> </li>
            <li><a href="">Keyboard, Mice & Accessories</a> </li>

          </ul>
         </div> 

         <div>
          <h3>Desktop & Monitors</h3>
          <ul>
          <li><a href="">CPUs</a> </li>
            <li><a href="">Monitors</a> </li>
       
          </ul>
         </div>
         <div>
          <h3>Wifi & Networking</h3>
          <ul>
          <li><a href="">Routers</a> </li>
            <li><a href="">Modems</a> </li>
    
          </ul>
         </div> 
    

         <div>
          <h3>Data Storage</h3>
          <ul>
          <li><a href="">USB Flash Drives</a> </li>
            <li><a href="">Hard Drives</a> </li>
            <li><a href="">Card Readers</a> </li>
 
          </ul>
         </div> 

         
         <div>
          <h3>Brands</h3>
          <ul>
          <li><a href="">Hp</a> </li>
          <li><a href="">Lenovo</a> </li>
            <li><a href="">Dell</a> </li>
            <li><a href="">Apple</a> </li>
            <li><a href="">Asus</a> </li>
 
          </ul>
         </div> 

         <div>
          <h3>Refurbished Corner</h3>
          <ul>
          <li><a href="">Refurbished Laptops</a> </li>

          </ul>
         </div> 
        </div>
          </Link>


        <Link to="bags" className="li"
        id="sidenavRow">
          <img src="https://s.alicdn.com/@sc04/kf/H2190f549bd874ea9b2f42e668a2c72446.jpg_220x220.jpg" alt="icons"/>
          <div className="w-100  d-flex align-items-center justify-content-between">
          <b>Bags</b>
          <AiOutlineRight/>
          </div>
          <div id="sub-container">
         <div>
          <h3>Business Bags & Cases</h3>
          <ul>
            <li><Link to="apparel">Chip Cases</Link></li>
            <li><a href="">Other Business Bags</a> </li>
            <li><a href="">Briefcases</a> </li>
            <li><a href="">Tutorial Bags</a> </li>

          </ul>
         </div>
         <div>
          <h3>Women's Bags</h3>
          <ul>
            <li><a href="">Women's Shoulder Bags</a> </li>
            <li><a href="">Women's Bucket Bags</a> </li>
            <li><a href="">Women's Canvas Bags</a> </li>
            <li><a href="">Women's Clutches</a> </li>

          </ul>
         </div>
         <div>
          <h3>Men's Bags</h3>
          <ul>
          <li><a href="">Men's Messenger Bags</a> </li>
            <li><a href="">Men's Chest Bags</a> </li>
            <li><a href="">Men's Backpacks</a> </li>
            <li><a href="">Men's Shoulder Bag's</a> </li>

          </ul>
         </div>
         <div>
          <h3>Other Bags</h3>
          <ul>
          <li><a href="">Laptop Bags</a> </li>
            <li><a href="">Hike Bags</a> </li>
            <li><a href="">Pet Backpacks</a> </li>
            <li><a href="">Travelling Bags</a> </li>

          </ul>
         </div> 
         <div>
          <h3>Scooters</h3>
          <ul>
          <li><a href="">Edge Banding</a> </li>
            <li><a href="">Furniture Foam</a> </li>
            <li><a href="">Furniture Covers</a> </li>
            <li><a href="">Furniture Pads</a> </li>

          </ul>
         </div> 
        </div>
          </Link>

        <Link to="shoes" className="li"
        id="sidenavRow">
          <img src="https://s.alicdn.com/@sc04/kf/H21cd857bdd6d4544ae143d94860158694.jpg_100x100xz.jpg" alt="icons"/>
          <div className="w-100  d-flex align-items-center justify-content-between">
          <b>Shoes</b>
          <AiOutlineRight/>
          </div>
          <div id="sub-container">
         <div>
          <h3>Men's Shoes</h3>
          <ul>
            <li><Link to="apparel">Mens Athletic Shoes</Link></li>
            <li><a href="">Men's Boots</a> </li>
            <li><a href="">Men's Fashion Sneakers</a> </li>
            <li><a href="">Men's Loafers & Slip-Ons</a> </li>
            <li><a href="">Men's Outdoor Shoes</a> </li>
            <li><a href="">Men's Sandals</a> </li>
            <li><a href="">Men's Canvas</a> </li>

          </ul>
         </div>
         <div>
          <h3>Women's Shoes</h3>
          <ul>
            <li><a href="">Women's Sandals</a> </li>
            <li><a href="">Women's Sneakers</a> </li>
            <li><a href="">Women's Flats</a> </li>
            <li><a href="">Women's Boots</a> </li>
            <li><a href="">Women's Athletic</a> </li>
            <li><a href="">Women's Slippers</a> </li>
            <li><a href="">Women's Outdoor</a> </li>

          </ul>
         </div>
         <div>
          <h3>Kid's Shoes</h3>
          <ul>
          <li><a href="">Kid's Sandals</a> </li>
            <li><a href="">Kid's Sneakers</a> </li>
            <li><a href="">Kid's Flats</a> </li>
            <li><a href="">Kid's Boots</a> </li>
            <li><a href="">Kid's Athletic</a> </li>
            <li><a href="">Kid's Slippers</a> </li>
            <li><a href="">Kid's Outdoor</a> </li>

          </ul>
         </div>

        </div>
          </Link>
   
        </div>
   </>
  )
}

export default Sidenav