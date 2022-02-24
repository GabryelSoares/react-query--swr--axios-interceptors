import { Children } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import axios from '../services/axios';

export type Repository = {
  full_name: string;
  description: string;
}

export const Repos = () => {

  const { data, isFetching} = useQuery('repos', async () => {
    const response = await axios.get<Repository[]>('/users/GabryelSoares/repos');
  
    return response.data;
  },{
    staleTime: 1000 * 60, // 1 minuto
  });

  return (
    <ul>
      {(isFetching) ? (
        <p>Carregando...</p>
      ) : (
        <>          
          {Children.toArray(
            data?.map((repo) => (
              <li>
                <Link to={`/repo/${repo.full_name}`}>
                  {repo.full_name}
                </Link>
                <p>{repo.description}</p>
              </li>
            ))
          )}
        </>
      )}
    </ul>
  );

}
