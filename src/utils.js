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
    //.json的作用就是把后端发回来的json string立体化成一个json object
    //也就是把我们搜索得到的结果返回并且立体化成一个json object
  });
};

export const uploadItem = (data, file) => {
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");
  const url = `${domain}/upload`;

  console.log(file);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("condition", data.condition);
  formData.append("type", data.type);
  formData.append("brand", data.brand);
  formData.append("style", data.style);
  formData.append("department", data.department);
  formData.append("shipping", data.shipping);
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
  return fetch(url, {
    method: "DELETE",
    // 在这里添加其他需要的配置，如 headers
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error in deleting item");
    }
    return response.json();
  });
}

export const getRecentItems = () => {
  const recentItemsUrl = `${domain}/recent-apps`;
  return fetch(recentItemsUrl).then((response) => {
    //fetch不写第二个参数默认http method是get
    if (response.status !== 200) {
      throw Error("Fail to get top games");
    }

    return response.json();
  });
};
