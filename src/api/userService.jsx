const API = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => fetch(API).then((res) => res.json());

export const createUser = (user) =>
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const updateUser = (id, user) =>
  fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const deleteUser = (id) =>
  fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
  
  export const getUserById = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("User fetch failed");
  return await res.json();
};
