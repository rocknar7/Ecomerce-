import React, { useState } from 'react';

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await onSignup(form);
    } catch (error) {
      setErr(error.message || 'Failed');
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={submit}>
        <input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input required placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button className="btn">Signup</button>
      </form>
    </div>
  );
}
