import { useState } from 'react';
import Auth from './Auth';
import Habits from './Habits';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  const handleAuth = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <Auth onAuth={handleAuth} />;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Habit Tracker</h1>
        <button className="secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <p className="muted">{user?.email}</p>
      <Habits token={token} onLogout={handleLogout} />
    </div>
  );
}