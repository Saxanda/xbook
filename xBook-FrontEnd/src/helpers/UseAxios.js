import axios from "axios";

async function useAxios(url, values) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzEzNTQxNTAwLCJleHAiOjE3MTQxNDYzMDB9.9tqiBvL4QYjnf2x_bcMMqldmpK71fWbNAj4_YUArl0I";

  const headers = { 
    // 'Access-Control-Allow-Origin': '*',
    "Content-Type": "application/json",

   
    accept: "*/*",
  };

  await axios.post(url, values, headers)
    .then((responce) => console.log(responce))
    .catch((err) => console.log(err));
}

export default useAxios;















  // localStorage.setItem("login", values)
// useEffect(() => {
//   async function fetchData() {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('data fetching failed');
//       }
//       const fetchedData = await response.json();
//       setData(fetchedData);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   fetchData();
// }, [url]);

// async function (values) => {

//   await axios
//     .post("http://localhost:8080/api/v1/auth/login", values, headers)
//     localStorage.setItem('login', values)

//     .then((responce) => console.log(responce))
//     .catch((err) => console.log(err));
// },

// axios
//   .post(url, values, headers)
//   .then((responce) => console.log(responce))
//   .catch((err) => console.log(err));

// const token =
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzEzNTQxNTAwLCJleHAiOjE3MTQxNDYzMDB9.9tqiBvL4QYjnf2x_bcMMqldmpK71fWbNAj4_YUArl0I";

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
//   accept: "*/*",
// };

// const handleLogin = (values) => {
//   axios
//     .post("http://localhost:8080/api/v1/auth/login", values, headers)
//     .then((res) => {
//       console.log("RESPONSE RECEIVED: ", res);
//     })
//     .catch((err) => {
//       console.log("AXIOS ERROR: ", err);
//     });
// };

// function handleLogin() {
//  console.log('log in');
//  fetch('http://localhost:8080/api/v1/auth/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json',
//      Authorization: `Bearer ${token}`,
//    },
//    body: JSON.stringify({email, password})
//  }).then(res => res.json())
//    .then(data => {
//      console.log('logged in', data.message);
//      localStorage.setItem('token', data.token);
//      navigate('/');
//  })
// }
