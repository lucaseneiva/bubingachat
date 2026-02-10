import { useState, useCallback } from 'react';
import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import api from '../utils/axiosConfig';


interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: () => Promise<T | null>;
}

export const useFetch = <T = any>(
  config: AxiosRequestConfig
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: AxiosResponse<T> = await api(config);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [config]);

  return { data, loading, error, execute };
};

export const useAuthenticatedFetch = () => {
  const execute = useCallback(async <T = any>(
    config: AxiosRequestConfig,
    token: string
  ): Promise<{ data?: T; error?: string }> => {
    try {
      const response: AxiosResponse<T> = await api({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      return { error: errorMessage };
    }
  }, []);

  return { execute };
};

export default api;