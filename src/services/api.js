export const BASE_URL = import.meta.env.VITE_API_URL || 'https://dummyjson.com';
export async function request(path, options = {}) {
 const response = await fetch(`${BASE_URL}${path}`, { ...options, headers: {'Content-Type':'application/json', ...options.headers}, signal: AbortSignal.timeout(12000) });
 if (!response.ok) { const error = new Error(response.status === 401 ? 'Credenciais inválidas ou sessão expirada.' : response.status === 403 ? 'Acesso negado.' : `Erro HTTP ${response.status}`); error.status = response.status; throw error; }
 return response.json();
}
export const login = (username,password) => request('/auth/login',{method:'POST',body:JSON.stringify({username,password,expiresInMins:60})});
export const me = token => request('/auth/me',{headers:{Authorization:`Bearer ${token}`}});
export const todos = id => request(`/todos/user/${encodeURIComponent(id)}`);
