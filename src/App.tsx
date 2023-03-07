import { useEffect, useState } from "react";

interface IRepository {
  id: number;
  full_name: string;
  owner: {
    login: string;
  }
}

function App() {
  const [repos, setRepos] = useState<IRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/orgs/google/repos")
      .then((r) => r.json())
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar dados</p>}
      {repos.map((repo) => {
        return (
          <div key={repo.id}>
            <h2>
              {repo.full_name}
              <span> by {repo.owner.login}</span>
            </h2>
          </div>
        )
      })}
    </div>
  )
}

export default App;
