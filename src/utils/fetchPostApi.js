import * as backendUrl from "constant/backend_url";
const fetchPostApi = (url, body, token) => {


  let data = fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": token == null ? '' : token
    }
  })
    .then((response) => {
      return response.json();
    })
    .then(response => {
      return response
    })
    .catch(error => { throw new Error('Something went wrong'); }
    );
  return data;
}

export default fetchPostApi;