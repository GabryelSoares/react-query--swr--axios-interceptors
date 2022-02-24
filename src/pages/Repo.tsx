import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./Repos";


export const Repo = () => {
  const params = useParams();
  const currentRepository = params['*'] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    // await queryClient.invalidateQueries(['repos']);

    // should request a API to update repo description
    const previousRepos = queryClient.getQueryData<Repository[]>('repos');

    if(previousRepos){
      const updatedRepos = previousRepos.map(repo => {
        if(repo.full_name === currentRepository){
          return {...repo, description: 'Test update description.' }
        } else {
          return repo;
        }
      });
      queryClient.setQueryData('repos', updatedRepos);
    };

  };

  return (
    <>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>Alterar descrição</button>
    </ >
  );

}
