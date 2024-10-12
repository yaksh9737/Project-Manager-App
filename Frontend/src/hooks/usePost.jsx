import axios from "axios";

export default async function usePost(data) {
  const response = await axios.post(
    "http://localhost:7890/api/auth/register",
    data
  );
  return response;
}
