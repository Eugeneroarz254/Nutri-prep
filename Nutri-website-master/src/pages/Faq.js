import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const Faq = () => {

  return (
    <>
      <Meta title={"FaQs"} />
      <BreadCrumb title="FaQs" />
      <Container class1="policy-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
          <div className="policy px-5">
           <h1>FaQs</h1>
           <div>
          <b>What is the estimated delivery time?</b>
          <p>The Best Sellers Shop typically delivers orders within 2-3 business days from the time the purchase is confirmed.</p>
        </div>

        <div>
          <b>Who will deliver my order?</b>
          <p>Your order will be delivered by The Best Sellers Shop's dedicated delivery team. We handle the entire process to ensure safe and timely delivery to your location.</p>
        </div>

           <div>
            <b>My order is shipped. How can I track it?</b>
            <p>To track your order visit:</p>
           </div>
           <div>
            <b>What do I do when I receive the order? <br/></b>
            <b>1. Identification</b>
            <p>Firstly present your valid ID or Voter’s Card, Driving License, Work ID or your Passport for identification. The name should match with what’s written on the invoice. In case you cannot collect the package yourself, ensure you inform us to add the new consignees name or add it to the address.</p>
             <b>2. Package Inspection</b>
             <p>In the presence of one of our delivery team, open the package and inspect the following:</p>
             <ul>
              <li>
              - Check product condition and quantity (e.g. Product quantity, look need to match what’s showing on the website)
              </li>
              <li>
                - Check if the specifications of the product matches from the website.
              </li>
          
             </ul>
             <b>3. Signing</b>
             <p>Once you are satisfied with the package, clear the products payment and once money is received in our account you can sign the package the delivery person will leave but in case of a problem, ask the delivery person to take back the item.</p>
           </div>
          </div>

          </div>
        </div>
      </Container>
    </>
  );
};

export default Faq;
