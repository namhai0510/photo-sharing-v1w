import models from "../modelData/models";

/**
 * fetchModel - Fetch a model from the web server. Nếu server không chạy,
 * tự động dùng dữ liệu mẫu trong models.js (phòng khi chạy trên CodeSandbox web).
 */
function fetchModel(url) {
  const fallback = () => {
    if (url === "/user/list") return Promise.resolve(models.userListModel());
    if (url.startsWith("/user/")) {
      const id = url.split("/")[2];
      return Promise.resolve(models.userModel(id));
    }
    if (url.startsWith("/photosOfUser/")) {
      const id = url.split("/")[2];
      return Promise.resolve(models.photoOfUserModel(id));
    }
    if (url === "/test/info") return Promise.resolve(models.schemaInfo());
    return Promise.reject(new Error("Unknown URL: " + url));
  };

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  }).catch(fallback);
}

export default fetchModel;