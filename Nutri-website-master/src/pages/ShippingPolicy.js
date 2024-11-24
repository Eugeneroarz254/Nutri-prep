import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";

const ShippingPolicy = () => {
  return (
    <>
      <Meta title={"Shipping Policy"} />
      <BreadCrumb title="Shipping Policy" />
      <Container class1="policy-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
          <div className="policy px-5">
          <h1>Shipping Policy</h1>
  <div>
    <b>1. Delivery and Inspection of Goods</b>
    <ul>
      <li><b>1.1</b> Orders shipped are given to the client once the payment has been fully processed and cleared in our account.</li>
      <li><b>1.2</b> Our standard delivery times are approximately 2-3 days on the specified regions. Delivery times may be longer for remote or less frequently serviced areas. Additionally, during peak periods like Black Friday and the festive season (15 November to 31 December), delivery times may be extended. Updated delivery times for these periods will be provided on our website or communicated by our stores and sales consultants. The Best Sellers Shop is not liable for any losses or damages resulting from delayed deliveries.</li>
            <li><b>1.3</b> Deliveries are made on weekdays during regular business hours. After-hours deliveries may incur additional charges. If goods are shipped via a third-party delivery service and delivery attempts fail due to customer unresponsiveness or inaccessibility, the items will be returned to our warehouse, and the customer may be responsible for return shipping costs.</li>
            <li><b>1.4</b> Delivery fees cover most towns listed on the checkout page. However, deliveries to remote or high-risk areas may incur extra charges. Customers will be contacted if additional charges apply, and if no agreement is reached, we reserve the right to cancel the order.</li>
            <li><b>1.5</b> It is the customer’s responsibility to inspect goods upon delivery. If there is visible damage to the packaging, this should be noted on the delivery waybill when signing for the goods.</li>
            <li><b>1.6</b> Some products may be delivered in a flat-pack or disassembled format and will require assembly. Our delivery personnel will handle the assembly of these items upon delivery. The product specifications on our website will indicate whether an item is delivered assembled or requires assembly.</li>
            <li><b>1.8</b> Delivery is guaranteed only to the address provided by the customer. The identity of the recipient may not be verified by the delivery service. Anyone accepting the delivery at the specified address is considered authorized to receive the goods and is responsible for checking for damages or shortages as outlined in sections 1.5 and 1.7.</li>
            <li><b>1.9</b> Any issues such as discrepancies, damages, or shortages must be reported within 48 hours of delivery using our online Customer Care form (link at the top left on the homepage). An Email confirmation will be sent upon successful submission of the claim.</li>
            <li><b>1.10</b> Delivery is handled by our own team on a 'door-to-door' basis and does not include additional services such as assembling or removal of packaging. Any additional services provided by our team beyond the standard delivery are at the customer’s own risk and cost, and The Best Sellers Shop will not be liable for any resulting damages or issues.</li>
            </ul>
          </div>
        </div>

          </div>
        </div>
      </Container>
    </>
  );
};

export default ShippingPolicy;
