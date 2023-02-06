import axios from "axios";

interface Options {
  method: string;
  url: string;
  headers: {};
  data?: Data;
}

interface Data {
  [key: string]: string | number;
}

export const imPoweredRequest = async (
  method: string,
  resource: string,
  data?: Data
) => {
  try {
    let options: Options = {
      method: method == "" ? "GET" : method,
      url: resource,
      headers: {
        "Content-Type": "application/json",
        "impowered-api-key": "19uq99myrxd6jmp19k5mygo5d461l0",
      },
    };
    if (data) {
      options = { ...options, data };
    }
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
