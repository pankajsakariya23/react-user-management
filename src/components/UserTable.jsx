import { Link } from 'react-router-dom';

export default function UserTable({ users, onEdit, onDelete, onQuickView }) {
  return (
    <table border="1">
      <thead>
        <tr><th>ID</th><th>Name</th><th>Email</th><th>Company</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.company?.name}</td>
            <td>
              <button onClick={() => onEdit(u)}>Edit</button>
              <button onClick={() => {
    const confirmed = window.confirm(`Are you sure you want to delete ${u.name}?`);
    if (confirmed) onDelete(u.id);
  }}>Delete</button>
			  <Link to={`/user/${u.id}`}>
				  <button
					className="bg-green-500 px-2 py-1 rounded text-white hover:bg-green-600"
				  >
					View
				  </button>
				</Link>
				<button
				  onClick={() => onQuickView(u)}
				  className="bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600"
				>
				  Quick View
				</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
