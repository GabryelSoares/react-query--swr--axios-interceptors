import { Children } from 'react'
import { useQuery } from 'react-query';

import axios from './services/axios';

type Repository = {
  full_name: string;
  description: string;
}

function App() {

  const { data, isFetching} = useQuery('repos', async () => {
    const response = await axios.get<Repository[]>('/users/GabryelSoares/repos');
  
    return response.data;
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
                <strong>{repo.full_name}</strong>
                <p>{repo.description}</p>
              </li>
            ))
          )}
        </>
      )}
    </ul>
  )
}

export default App
