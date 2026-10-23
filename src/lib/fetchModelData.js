/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}       A Promise that resolves to the parsed JSON data.
 */
function fetchModel(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status + ": " + response.statusText);
    }
    return response.json();
  });
}

export default fetchModel;