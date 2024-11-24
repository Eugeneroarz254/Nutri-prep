import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const customerData = localStorage.getItem("customer");
    const storedUser = customerData ? JSON.parse(customerData) : null;
    const token = storedUser?.token || storedUser?.user?.token;
    return token ? children : <Navigate to="/login" replace={true} />;
};
