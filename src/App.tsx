import { useEffect, useState } from "react";

interface IRepository {
  id: number;
  full_name: string;
  owner: {
    login: string;
  }
}

type RepositoryProps = {
  liked: boolean;
} & IRepository;

function App() {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);
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

  function toggleLike(id: number) {
    setRepos((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            liked: !r.liked,
          };
        }
        return r;
      })
    )
  }

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
              <button onClick={() => toggleLike(repo.id)}>{
                repo.liked ? 'Descurtir' : 'Curtir'
              }</button>
            </h2>
          </div>
        )
      })}
    </div>
  )
}

export default App;
