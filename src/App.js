import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  };

  useEffect(() => {
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Teste título - ${Date.now()}`,
      owner: 'Guilherme Locks'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
      .then(() => {
        getRepositories();
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}            
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
