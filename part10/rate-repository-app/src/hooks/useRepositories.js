import { useEffect, useState } from 'react';

import config from '../utils/config';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);

    const response = await fetch(config.apiUrl);
    const data = await response.json();

    setLoading(false);

    setRepositories(data);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return { repositories, loading, refetch: fetchRepos };
};

export default useRepositories;
