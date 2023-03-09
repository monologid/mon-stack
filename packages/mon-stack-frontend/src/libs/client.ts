import BackendClient from '@mon-stack/backend-client';

export const getBackendClient = () => {
  return new BackendClient({ url: process.env.MON_STACK_BACKEND_URL || process.env.BASE_API_URL || '' });
};
