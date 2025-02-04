import axios from "axios";
import {
  CommunityFeedback,
  CustomerDeviceData,
  PrrResponse,
  SalesData,
  SalesScore,
} from "./types";

const API_URL = "http://3.111.196.92:8020/api/v1";
const LOCAL_API_URL = "http://localhost:3000/api";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      email: "string",
      password,
      phone_number: "string",
      input_code: 0,
    });
    if (response.data.message === "Incorrect Username") {
      throw new Error("Incorrect Username");
    } else if (response.data.message === "Incorrect Password") {
      throw new Error("Incorrect Password");
    }

    return response;
  } catch (error) {
    throw new Error(error as string | "Login failed");
  }
};

export const getPrr = async (): Promise<PrrResponse | undefined> => {
  try {
    const encodedCredentials = btoa(
      `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
    );
    const response = await axios.get(`${API_URL}/sample_assignment_api_1`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSalesData = async (): Promise<SalesData[] | undefined> => {
  try {
    const encodedCredentials = btoa(
      `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
    );
    const response = await axios.get(`${LOCAL_API_URL}/data`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSalesScore = async (): Promise<SalesScore | undefined> => {
  try {
    const encodedCredentials = btoa(
      `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
    );
    const response = await axios.get(`${API_URL}/sample_assignment_api_3`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getDeviceData = async (): Promise<
  CustomerDeviceData | undefined
> => {
  try {
    const encodedCredentials = btoa(
      `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
    );
    const response = await axios.get(`${API_URL}/sample_assignment_api_4`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getFeedback = async (): Promise<CommunityFeedback | undefined> => {
  try {
    const encodedCredentials = btoa(
      `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
    );
    const response = await axios.get(`${API_URL}/sample_assignment_api_5`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
