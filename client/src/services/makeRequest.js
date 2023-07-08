import axios from "axios";
import jwtDecode from "jwt-decode";

const baseURL = "http://localhost:5000";

const makeRequest = axios.create({
  baseURL,
  withCredentials: true,
});

const user = JSON.parse(localStorage.getItem("userData"));

const refreshNewToken = async () => {
  try {
    const res = await makeRequest.post("/auth/refresh-token", {
      refreshToken: user && user.refreshToken,
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      })
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

makeRequest.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = user && jwtDecode(user.accessToken);
    if (decodedToken?.exp * 1000 < currentDate) {
      const data = await refreshNewToken();
      config.headers["Authorization"] = "Bearer " + data?.accessToken;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// const AxiosInterceptor = ({ children }) => {
//   console.log("interceptor");
//   const [isSet, setIsSet] = useState(false);

//   // RESPONSE
//   useEffect(() => {
//     console.log("useEffect res");

//     const resInterceptor = (response) => {
//       console.log("resInterceptor res");
//       return response;
//     };

//     const errInterceptor = async (error) => {
//       console.log("errInterceptor res");
//       if (error.response.status === 401) {
//         const dataRT = await axios.get(
//           `http://localhost:5000/auth/${userData?.userId}/refresh-token`
//         );
//         const refreshToken = dataRT.data.refreshToken;

//         if (refreshToken) {
//           const newTokens = await axios.post(
//             "http://localhost:5000/auth/refresh-token",
//             { refreshToken }
//           );

//           const newAccessToken = newTokens.data.accessToken;

//           if (newAccessToken) {
//             localStorage.setItem(
//               "userData",
//               JSON.stringify({
//                 ...userData,
//                 accessToken: newTokens.data.accessToken,
//               })
//             );

//             makeRequest.defaults.headers.common[
//               "Authorization"
//             ] = `Bearer ${newTokens.data.accessToken}`;
//           }
//         }
//       }
//     };

//     const interceptor = makeRequest.interceptors.response.use(
//       resInterceptor,
//       errInterceptor
//     );

//     setIsSet(true);
//     return () => makeRequest.interceptors.response.eject(interceptor);
//   }, []);

//   return isSet && children;
// };

// export { AxiosInterceptor };
export default makeRequest;
