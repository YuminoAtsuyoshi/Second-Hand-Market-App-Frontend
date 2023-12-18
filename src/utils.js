const domain = "http://secondhandedmarketapp.uw.r.appspot.com";

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
      localStorage.setItem("username", credential.username);
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
  const location = query?.location ?? "";
  const user = query?.user ?? "";

  const authToken = localStorage.getItem("authToken");
  const url = new URL(`${domain}/search`);
  url.searchParams.append("title", title);
  url.searchParams.append("description", description);
  url.searchParams.append("location", location);
  url.searchParams.append("user", user);

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
  });
};

export const uploadItem = (data, file) => {
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");
  const url = `${domain}/upload`;

  console.log(file);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("location", data.location);
  formData.append("price", parseInt(data.price));
  formData.append("media_file", file);
  formData.append("description", data.description);
  formData.append("username", username);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to upload item");
    }
  });
};

export function deleteItem(itemId) {
  const url = `${domain}/app/${itemId}`;
  const authToken = localStorage.getItem("authToken");
  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Error in deleting item");
    }
  });
}

export const getRecentItems = () => {
  const recentItemsUrl = `${domain}/recent-apps`;
  return fetch(recentItemsUrl).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get top games");
    }

    return response.json();
  });
};

export const checkout = (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/checkout?appID=${id}`;

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fail to checkout");
      }
      return response.text();
    })
    .then((redirectUrl) => {
      window.location = redirectUrl;
    });
};

export const getAccountDetail = () => {
  const url = `${domain}/account/details`;
  const authToken = localStorage.getItem("authToken");
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get top games");
    }

    return response.json();
  });
};
