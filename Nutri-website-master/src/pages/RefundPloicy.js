import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const RefundPloicy = () => {

  return (
    <>
      <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />
      <Container class1="policy-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
          <div className="policy px-5">
            <h1>Return & Refund Policy</h1>
            <div>
            <b>1. Return & Refund Policy</b>
          <ul>
            <li><b>1.1</b> Unless otherwise stated, all products purchased from The Best Sellers Shop come with a 14-day satisfaction guarantee, starting from the delivery date. This guarantee does not apply to ‘demo’ or ‘scratch and dent’ items bought in-store or on delivery where the customer had the chance to inspect the product before purchase.</li>
            <li><b>1.2</b> To return a product, customers must submit a return request through our website within 14 days of delivery. </li>
            <li><b>1.3</b> The Best Sellers Shop will cover the transport costs for returns under the 14-day guarantee, but this applies only to purchases delivered by us or our delivery partners. Original delivery fees paid by the customer will not be refunded. For items collected by the customer, returns must be made at the customer’s expense to our nearest warehouse.</li>
            <li><b>1.4</b> Items collected from a store may be returned to that specific store. Pay on delivery purchases cannot be returned to a physical store.</li>
            <li><b>1.5</b> All authorized returns must be ready for collection by our transport team within three days after the 14-day period ends. Items not prepared for collection within this timeframe will no longer be eligible for a refund.</li>
            <li><b>1.6</b> Returned products must be in their original packaging and in like-new condition. If the original packaging is not available, the customer must ensure the item is adequately packed to prevent damage during transit. Our couriers do not provide packaging services and may refuse to accept poorly packaged items. If packaging assistance is provided by our team, it is done at the customer’s risk. We recommend taking clear photos of the item before return, as the customer will be responsible for any damage observed upon receipt.</li>
            <li><b>1.7</b> Returns lacking original packaging may incur a reasonable surcharge of up to 15% of the purchase price.</li>
            <li><b>1.8</b> Returned products will be inspected for damage or other issues. We reserve the right to impose reasonable surcharges or handling fees for missing components or items returned in poor condition.</li>
            <li><b>1.9</b> Refunds may take up to 14 days from the receipt of the returned goods, provided the return meets our criteria. If any deductions or surcharges apply, they will be communicated to the customer, and refunds will be processed only after agreement on the final amount.</li>
            <li><b>1.10</b> Refunds for credit card payments will be processed as a reversal to the original credit card. For cash refunds via EFT, customers must provide proof of banking details and ID (or company registration number for businesses). Refunds will not be issued to third parties.</li>
          </ul>
            </div>

        </div>

          </div>
        </div>
      </Container>
    </>
  );
};

export default RefundPloicy;
