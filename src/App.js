import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAdvice = useCallback(() => {
    setLoading(true);
    setError(false);

    axios.get('https://api.adviceslip.com/advice', { params: { _t: Date.now() } })
      .then((response) => {
        setAdvice(response.data.slip.advice);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchAdvice();
  }, [fetchAdvice]);

  return (
    <div className="app">
      <div className="card">
        <p className="label">Advice of the moment</p>
        <h1 className="heading">
          {loading && <span className="loading-text">Thinking...</span>}
          {error && !loading && <span className="error-text">Could not load advice. Try again!</span>}
          {!loading && !error && advice}
        </h1>
        <button className="button" onClick={fetchAdvice} disabled={loading}>
          <span>{loading ? 'Loading...' : 'Give Me Advice!'}</span>
        </button>
      </div>
    </div>
  );
}

export default App;