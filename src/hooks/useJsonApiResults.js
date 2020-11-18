import { useState, useEffect } from 'react';
import api from '../api/api';
import { ERROR_MESSAGE } from '../constants/JsonApiScreen';

export default () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getApiData = async () => {
    try {
      const res = await api.get('/photos');
      setResults(res.data);
      setLoading(false);
    } catch(err) {
      console.error(err);
      setError(ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return [results, loading, error, getApiData];
}
