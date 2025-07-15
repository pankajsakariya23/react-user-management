import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function UserDetailsPage() {
  const { id } = useParams(); // extract user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (!user?.id) return <p>User not found.</p>;

  return (
    <div>
      <h2>User Details (ID: {user.id})</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Address:</strong> {user.address?.city}, {user.address?.street}</p>
    </div>
  );
}
