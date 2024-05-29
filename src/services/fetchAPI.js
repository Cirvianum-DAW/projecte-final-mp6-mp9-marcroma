export default async function fetchFromApi(endpoint, options = {}) {
  const url = `https://6644bc71b8925626f88fb8fa.mockapi.io/portfolio/v1/${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const settings = {
    method: 'get',
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  if (options.body) settings.body = JSON.stringify(options.body);

  try {
    const response = await fetch(url, settings);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to fetch data from the API, status code: ${response.status}`);
    }
    const data = await response.json(); // Convert response to JSON
    return data;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
}
