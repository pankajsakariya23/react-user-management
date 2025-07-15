import { useEffect, useState } from 'react';
import * as userService from '../api/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
const [search, setSearch] = useState('');
const [companyFilter, setCompanyFilter] = useState('All');

  useEffect(() => {
    userService.getUsers().then(setUsers);
  }, []);

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



let filteredUsers = users.filter(u => {
  const matchesSearch =
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    companyFilter === 'All' || u.company?.name === companyFilter;

  return matchesSearch && matchesFilter;
});

const paginatedUsers = filteredUsers.slice(
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
