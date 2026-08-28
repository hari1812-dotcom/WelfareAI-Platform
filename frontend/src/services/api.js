const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined,
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export function registerCitizen(citizenData) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(citizenData),
  });
}

export function getCitizens() {
  return request('/citizens');
}

export function getCitizenById(id) {
  return request(`/citizens/${id}`);
}

export function updateCitizen(id, updates) {
  return request(`/citizens/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export function login(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function getMe() {
  return request('/auth/me');
}

export function getDashboardData() {
  return request('/dashboard');
}
