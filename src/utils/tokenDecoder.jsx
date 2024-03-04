import { jwtDecode } from "jwt-decode";

const tokenDecoder = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export { tokenDecoder };
