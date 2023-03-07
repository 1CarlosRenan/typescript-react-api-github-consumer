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

  useEffect(() => {
    fetch("https://api.github.com/orgs/google/repos")
      .then((r) => r.json())
      .then((data) => {
        setRepos(data);
      });
  }, []);

  return (
    <div>
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
