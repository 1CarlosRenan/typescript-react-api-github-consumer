import useGithubRepositories from "./hooks/useGithubRepositories";

function App() {
  const { repos, isLoading, error } = useGithubRepositories({ org: 'google' })

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
              <button> Like </button>
            </h2>
          </div>
        )
      })}
    </div>
  )
}

export default App;
