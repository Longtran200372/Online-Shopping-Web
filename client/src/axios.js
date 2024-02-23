import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 300000,
  withCredentials: true,
});

// sử lý data sau khi response từ server
instance.interceptors.response.use(
  async (response) => {
    // get config of request has this response
    let config = response.config;

    // api don't need login
    if (
      config.url.indexOf("/users/signin") >= 0 ||
      config.url.indexOf("/users/signup") >= 0 ||
      config.url.indexOf("/products") >= 0 ||
      config.url.indexOf("/users/refresh-token") >= 0
    ) {
      return response;
    }

    // api need login
    let { code, message } = response.data;
    if (code && code === 401) {
      if (message && message === "jwt expired") {
        try {
          // token hết hạn
          //call refresh_token api to get new token
          const res = await instance.get("/users/refresh-token");
          const { access_token } = res.data;
          // after has newToken
          if (access_token) {
            config.headers.Authorization = "Bearer " + access_token;
            // save new token
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth = {
              ...auth,
              access_token,
            };
            localStorage.setItem("auth", JSON.stringify(auth));

            // call prev api
            return instance(config);
          }
        } catch (error) {
          return;
        }
      }
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
