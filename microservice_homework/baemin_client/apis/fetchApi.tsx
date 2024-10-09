import axios from "axios";

const url = "http://localhost:8080";
export const fetchCategory = async () => {
  try {
    const response = await fetch(`${url}/category`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
export const login = async (data: any) => {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.data;
    return result;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
export const register = async (data: any) => {
  try {
    const response = await axios.post(`${url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.data;
    return result;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
export const searchProduct = async (name: string, page: number) => {
  try {
    const response = await axios.get(
      `${url}/product/search?name=${name}&page=${page}`
    );
    const result = await response.data;
    return result;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
export const orderProduct = async (data: any) => {
  try {
    const response = await axios.post(`${url}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.data;
    return result;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
