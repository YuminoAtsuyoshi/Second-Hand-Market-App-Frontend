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

export const searchItems = (query) => {
  console.log("Sending search request with query:", query);
  
  const title = query?.title ?? "";
  const description = query?.description ?? "";

  const authToken = localStorage.getItem("authToken");
  const url = new URL(`${domain}/search`);
  url.searchParams.append("title", title);
  url.searchParams.append("description", description);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text || "Failed to search items");
      });
    }

    return response.json();
    //.json的作用就是把后端发回来的json string立体化成一个json object
    //也就是把我们搜索得到的结果返回并且立体化成一个json object
  });
};
