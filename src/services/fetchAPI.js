export default async function fetchFromApi(endpoint, options = {}) {
  const url = `https://6644bc71b8925626f88fb8fa.mockapi.io/portfolio/v1/${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const settings = {
    method: "GET", // Default to GET
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  if (options.body) settings.body = JSON.stringify(options.body);

  console.log("Request URL:", url);
  console.log("Request Settings:", settings);

  try {
    const response = await fetch(url, settings);
    console.log("Response Status:", response.status);
    if (response.status < 200 || response.status >= 300) {
      const responseText = await response.text();
      console.log("Response Text:", responseText);
      throw new Error(
        `Failed to fetch data from the API, status code: ${response.status}`
      );
    }
    if (response.status === 204) {
      return null; // No content for DELETE request
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
