const API_URL = "http://localhost:3000";

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users.json`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
