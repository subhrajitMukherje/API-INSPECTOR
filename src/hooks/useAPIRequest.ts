import { useState, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { APIRequest, APIResponse } from '../types/api';

export const useAPIRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (request: APIRequest): Promise<APIResponse> => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const config: AxiosRequestConfig = {
        method: request.method,
        url: request.url,
        headers: { ...request.headers },
        timeout: 30000,
      };

      // Add authentication
      if (request.auth) {
        switch (request.auth.type) {
          case 'bearer':
            if (request.auth.token) {
              config.headers!['Authorization'] = `Bearer ${request.auth.token}`;
            }
            break;
          case 'basic':
            if (request.auth.username && request.auth.password) {
              const credentials = btoa(`${request.auth.username}:${request.auth.password}`);
              config.headers!['Authorization'] = `Basic ${credentials}`;
            }
            break;
          case 'api-key':
            if (request.auth.key && request.auth.value) {
              config.headers![request.auth.key] = request.auth.value;
            }
            break;
        }
      }

      // Add request body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(request.method) && request.body) {
        try {
          config.data = JSON.parse(request.body);
          config.headers!['Content-Type'] = 'application/json';
        } catch {
          config.data = request.body;
        }
      }

      const response = await axios(config);
      const duration = Date.now() - startTime;
      const size = JSON.stringify(response.data).length;

      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
        data: response.data,
        duration,
        size,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const axiosError = error as AxiosError;
      
      if (axiosError.response) {
        const size = JSON.stringify(axiosError.response.data).length;
        return {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          headers: axiosError.response.headers as Record<string, string>,
          data: axiosError.response.data,
          duration,
          size,
        };
      }
      
      throw new Error(axiosError.message || 'Request failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendRequest, isLoading };
};