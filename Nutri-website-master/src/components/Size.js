import React from "react";
import { Radio } from "antd";

const Size = ({ sizeData, setSize }) => {
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize); // Send the selected size's ID back to the parent component
  };

  return (
    <Radio.Group className="Radio-group" onChange={handleSizeChange}>
      {sizeData &&
        sizeData.map((item) => (
          <Radio.Button value={item._id} key={item._id}>
            {item.title} (KES {parseInt(item.price).toLocaleString()})
          </Radio.Button>
        ))}
    </Radio.Group>
  );
};

export default Size;
