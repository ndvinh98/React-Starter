export default function envConfig() {
  const API_VERSION = 'v1';
  const baseUrl = (import.meta as any).env['VITE_BASE_URL'];
  return {
    BASE_URL: `${baseUrl}/api/${API_VERSION}`,
    API_VERSION,
    FE_VERSION: '0.0.1',
  };
}
