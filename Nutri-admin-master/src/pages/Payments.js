import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },

  {
    title: "Mobile",
    dataIndex: "number",
  },

  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
  },
];

const Payments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  const paymentState = useSelector((state) => state.auth.payments);
  console.log("payments",paymentState)
  const data =[];
  for (let i = 0; i < paymentState.length; i++) {
    if (paymentState[i].role !== "admin") {
      data.push({
        key: i + 1,
    number:paymentState[i].number ,
    amount: paymentState[i].amount,
    createdAt: paymentState[i].createdAt,
  });
}
}


  return (
    <div>
      <h3 className="mb-4 title">Payments</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Payments;
