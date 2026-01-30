const API_URL = "http://localhost:3000";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users.json`);
  return handleResponse(response);
};

// Tenants (Inquilinos)
export const fetchTenants = async () => {
  const response = await fetch(`${API_URL}/inquilinos.json`);
  return handleResponse(response);
};

export const fetchTenant = async (id) => {
  const response = await fetch(`${API_URL}/inquilinos/${id}.json`);
  return handleResponse(response);
};

export const createTenant = async (data) => {
  const response = await fetch(`${API_URL}/inquilinos.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inquilino: data })
  });
  return handleResponse(response);
};

export const updateTenant = async (id, data) => {
  const response = await fetch(`${API_URL}/inquilinos/${id}.json`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inquilino: data })
  });
  return handleResponse(response);
};

export const deleteTenant = async (id) => {
  const response = await fetch(`${API_URL}/inquilinos/${id}.json`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error("Delete failed");
  return true;
};

// Installments (Mensalidades)
export const updateInstallment = async (id, data) => {
  const response = await fetch(`${API_URL}/mensalidades/${id}.json`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensalidade: data })
  });
  return handleResponse(response);
};
