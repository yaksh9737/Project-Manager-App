import axios from "axios";

export default async function useLogin(data) {
  const response = await axios.post(
    "http://localhost:7890/api/auth/login",
    data
  );
  return response;
}
