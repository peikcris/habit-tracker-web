import { useEffect, useState } from 'react';
import { request } from './api';

export default function Habits({ token, onLogout }) {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Local date as YYYY-MM-DD
  const today = new Date().toLocaleDateString('en-CA');

  const handleError = (err) => {
    if (
      err.message === 'Invalid or expired token' ||
      err.message === 'Authentication required'
    ) {
      onLogout();
    } else {
      setError(err.message);
    }
  };

  const load = async () => {
    try {
      const data = await request(`/habits?date=${today}`, { token });
      setHabits(data);
      setError('');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addHabit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await request('/habits', { method: 'POST', body: { name }, token });
      setName('');
      await load();
    } catch (err) {
      handleError(err);
    }
  };

  const toggle = async (habit) => {
    try {
      if (habit.completed_today) {
        await request(`/habits/${habit.id}/complete/${today}`, {
          method: 'DELETE',
          token,
        });
      } else {
        await request(`/habits/${habit.id}/complete`, {
          method: 'POST',
          body: { date: today },
          token,
        });
      }
      await load();
    } catch (err) {
      handleError(err);
    }
  };

  const remove = async (habit) => {
    if (!window.confirm(`Delete "${habit.name}"?`)) return;
    try {
      await request(`/habits/${habit.id}`, { method: 'DELETE', token });
      await load();
    } catch (err) {
      handleError(err);
    }
  };

  const doneCount = habits.filter((h) => h.completed_today).length;

  return (
    <div>
      <form className="add-form" onSubmit={addHabit}>
        <input
          type="text"
          placeholder="New habit (e.g. Drink water)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="muted">Loading...</p>
      ) : habits.length === 0 ? (
        <p className="muted">No habits yet. Add your first one above.</p>
      ) : (
        <>
          <p className="muted">
            {doneCount} of {habits.length} done today
          </p>
          <ul className="habit-list">
            {habits.map((habit) => (
              <li key={habit.id} className="habit">
                <label>
                  <input
                    type="checkbox"
                    checked={!!habit.completed_today}
                    onChange={() => toggle(habit)}
                  />
                  <span className={habit.completed_today ? 'name done' : 'name'}>
                    {habit.name}
                  </span>
                  {habit.streak > 0 && (
                    <span className="streak">🔥 {habit.streak}</span>
                  )}
                </label>
                <button
                  type="button"
                  className="delete"
                  onClick={() => remove(habit)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}