const domain = "https://dev-office-402602.uw.r.appspot.com";

export const login = (credential) => {
  const url = `${domain}/signin`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("Fail to log in");
      }

      return response.text();
    })
    .then((token) => {
      localStorage.setItem("authToken", token);
    });
};

export const register = (credential) => {
  const url = `${domain}/signup`;
  credential.age = parseInt(credential.age);
  console.log(credential);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};
