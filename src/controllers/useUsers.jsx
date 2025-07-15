import { useEffect, useState } from 'react';
import * as userService from '../api/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
const [search, setSearch] = useState('');
const [companyFilter, setCompanyFilter] = useState('');

useEffect(() => {
  const fetchUsers = async () => {
    try {
      let url = 'https://jsonplaceholder.typicode.com/users';

      const params = [];
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (companyFilter) params.push(`company=${encodeURIComponent(companyFilter)}`);
      if (params.length) url += '?' + params.join('&');

      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  fetchUsers();
}, [search, companyFilter]);

  const create = (user) => {
    userService.createUser(user).then((data) => {
      setUsers([...users, { ...data, id: users.length + 1 }]);
    });
  };

  const update = (id, user) => {
    userService.updateUser(id, user).then((updated) => {
      setUsers(
        users.map((u) =>
          u.id === id ? { ...updated, company: { name: user.company.name } } : u
        )
      );
    });
  };

  const remove = (id) => {
    userService.deleteUser(id).then(() => {
      setUsers(users.filter((u) => u.id !== id));
    });
  };



const paginatedUsers = users.slice(
  (currentPage - 1) * usersPerPage,
  currentPage * usersPerPage
);

  return {
    users: paginatedUsers,
    create,
    update,
    remove,
    setCurrentPage,
    totalPages: Math.ceil(users.length / usersPerPage),
    currentPage,
	search,
  setSearch,
  companyFilter,
  setCompanyFilter
  };
};
