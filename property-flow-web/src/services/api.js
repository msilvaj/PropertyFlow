const API_URL = "http://localhost:3000";

const handleResponse = async (response) => {
  if (response.status === 401) {
    // Session expired or unauthenticated
    window.dispatchEvent(new CustomEvent('unauthorized'));
    throw new Error("Sessão expirada. Por favor, faça login novamente.");
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  credentials: 'include'
};

// Auth
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/users/sign_in.json`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({ user: { email, password } })
  });
  return handleResponse(response);
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/users/sign_out.json`, {
    method: 'DELETE',
    ...defaultOptions
  });
  if (!response.ok && response.status !== 401) throw new Error("Logout failed");
  return true;
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users.json`, { ...defaultOptions });
  return handleResponse(response);
};

// Tenants (Inquilinos)
export const fetchTenants = async () => {
  const response = await fetch(`${API_URL}/inquilinos.json`, { ...defaultOptions });
  return handleResponse(response);
};

export const fetchTenant = async (id) => {
  const response = await fetch(`${API_URL}/inquilinos/${id}.json`, { ...defaultOptions });
  return handleResponse(response);
};

export const createTenant = async (data) => {
  const response = await fetch(`${API_URL}/inquilinos.json`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({ inquilino: data })
  });
  return handleResponse(response);
};

export const updateTenant = async (id, data) => {
  const response = await fetch(`${API_URL}/inquilinos/${id}.json`, {
    method: 'PATCH',
    ...defaultOptions,
    body: JSON.stringify({ inquilino: data })
  });
  return handleResponse(response);
};

export const deleteTenant = async (id) => {
  const response = await fetch(`${API_URL}/inquilinos/${id}.json`, {
    method: 'DELETE',
    ...defaultOptions
  });
  if (!response.ok) throw new Error("Delete failed");
  return true;
};

// Properties
export const fetchProperties = async () => {
  const response = await fetch(`${API_URL}/properties.json`, { ...defaultOptions });
  return handleResponse(response);
};

// Condominiums
export const fetchCondominiums = async () => {
  const response = await fetch(`${API_URL}/condominiums.json`, { ...defaultOptions });
  return handleResponse(response);
};

// Installments (Mensalidades)
export const updateInstallment = async (id, data) => {
  const response = await fetch(`${API_URL}/mensalidades/${id}.json`, {
    method: 'PATCH',
    ...defaultOptions,
    body: JSON.stringify({ mensalidade: data })
  });
  return handleResponse(response);
};
