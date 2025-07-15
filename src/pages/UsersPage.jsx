import { useState } from 'react';
import { useUsers } from '../controllers/useUsers';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import { getUserById } from '../api/userService';

export default function UsersPage() {
  const {
    users,
    create,
    update,
    remove,
    setCurrentPage,
    totalPages,
    currentPage,
	setSearch,
  setCompanyFilter,
  search,
  companyFilter,
  } = useUsers();
  
  const [quickViewUser, setQuickViewUser] = useState(null);
const [quickViewLoading, setQuickViewLoading] = useState(false);
const [quickViewError, setQuickViewError] = useState(null);

  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [editingId, setEditingId] = useState(null);

const handleQuickView = async (user) => {
  if (quickViewUser?.id === user.id) {
    setQuickViewUser(null); // toggle off
    return;
  }

  setQuickViewLoading(true);
  setQuickViewError(null);
  setQuickViewUser(null);

  try {
    const freshUser = await getUserById(user.id);
    setQuickViewUser(freshUser);
  } catch (err) {
    setQuickViewError("Failed to load user details.");
  } finally {
    setQuickViewLoading(false);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: form.name,
      email: form.email,
      company: { name: form.company },
    };
    editingId ? update(editingId, user) : create(user);
    setForm({ name: '', email: '', company: '' });
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      company: user.company?.name || '',
    });
    setEditingId(user.id);
  };

  return (
    <div>
      <h2>User Manager</h2>
      <UserForm onSubmit={handleSubmit} form={form} setForm={setForm} />
	  
	  <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
<input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search name/email"
/>

<select
  value={companyFilter}
  onChange={(e) => setCompanyFilter(e.target.value)}
>
  <option value="">All Companies</option>
  <option value="Romaguera-Crona">Romaguera-Crona</option>
  <option value="Deckow-Crist">Deckow-Crist</option>
  {/* Add more static or fetched company options */}
</select>
</div>

      <UserTable users={users} onEdit={handleEdit} onDelete={remove} onQuickView={handleQuickView} />
      <div style={{ marginTop: 10 }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
          >
            {i + 1}
          </button>
        ))}
      </div>
	  
{quickViewLoading && <p>Loading user details...</p>}
{quickViewError && <p style={{ color: 'red' }}>{quickViewError}</p>}

{quickViewUser && (
  <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc" }}>
    <h3>User Quick View (ID: {quickViewUser.id})</h3>
    <p><strong>Name:</strong> {quickViewUser.name}</p>
    <p><strong>Email:</strong> {quickViewUser.email}</p>
    <p><strong>Phone:</strong> {quickViewUser.phone}</p>
    <p><strong>Company:</strong> {quickViewUser.company?.name}</p>
    <p><strong>Website:</strong> {quickViewUser.website}</p>
    <p><strong>Address:</strong> {quickViewUser.address?.street}, {quickViewUser.address?.city}</p>
  </div>
)}
    </div>
  );
}
