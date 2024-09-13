// remote data source
export const getJsonData = async () => {
  // TODO: update endpoint 
  try {
    const res = await fetch(`http://localhost:8000/api/v1/academies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_KEY}`
      }});
    const json = await res.json();

    return json;
  } catch(err) {
    console.log(`Unable to render data: ${err}`);
  }
}

// local data source
export const getTestJsonData = async () => {
  const res = await fetch('./data/test-data.json');
  const json = await res.json()

  return json;
}