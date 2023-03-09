import useGithubRepositories from "./hooks/useGithubRepositories";
import useRepositoryLikeManagement from "./hooks/useRepositoryLikeManagement";

function App() {
  const { repos, isLoading, error, refetch } = useGithubRepositories({
    org: "google",
  });
  const { repositoryLikes, toggleLike } = useRepositoryLikeManagement();

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && (
        <div>
          <p>Erro ao carregar dados</p>
          <button onClick={() => refetch()}>Tentar Novamente</button>
        </div>
      )}
      {repos.map((repo) => {
        const isLiked = repositoryLikes.find((r) => r.id === repo.id)?.liked;
        return (
          <div key={repo.id}>
            <h2>
              {repo.full_name}
              <span> by {repo.owner.login}</span>
              <button onClick={() => toggleLike(repo.id)}>
                {isLiked ? "Descurtir" : "Curtir"}
              </button>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
