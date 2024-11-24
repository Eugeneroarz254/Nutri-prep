export const base_url = "http://localhost:80/api/";

const customerData = localStorage.getItem("customer");
const storedUser = customerData ? JSON.parse(customerData) : null;

// Extract token based on the user's login method
const token = storedUser?.token || storedUser?.user?.token;

export const config = {
  headers: {
    Authorization: `Bearer ${token ? token : ""}`,
    Accept: "application/json",
  },
};

