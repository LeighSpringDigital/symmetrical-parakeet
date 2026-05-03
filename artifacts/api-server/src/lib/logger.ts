export const logger = {
  info: (data: any, message?: string) => {
    console.log('[INFO]', message || '', data);
  },
  error: (err: any, message?: string) => {
    console.error('[ERROR]', message || '', err);
  }
};
