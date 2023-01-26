import axios from "axios";

export const imPoweredRequest = async (method, resource, data) => {
  try {
    let options = {
      method: method == "" ? "GET" : method,
      url: resource,
      headers: {
        "Content-Type": "application/json",
        "impowered-api-key": "19uq99myrxd6jmp19k5mygo5d461l0",
      },
    };
    if (data) {
      options.data = data;
    }
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
