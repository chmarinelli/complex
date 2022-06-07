import store from '@/store';

export const responseErrorHandler = (error) => {
  if (error.isAxiosError) {
    if (error.response?.status) {
      // Redirect or show global error
      store.dispatch('showError');
    }
    throw error;
  }
};
