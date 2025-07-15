export default function UserForm({ onSubmit, form, setForm }) {
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
}
