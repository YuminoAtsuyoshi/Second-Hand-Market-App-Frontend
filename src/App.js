import React, { useState, useEffect } from "react";
import { Layout, message } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Purchase from "./pages/Purchase";
import Selling from "./pages/Selling";
import Detail from "./pages/Detail";
import { searchItems } from "./utils";
import LogoutRedirect from "./components/LogoutRedirect";

const { Header, Content } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setLoggedIn(true);
    }
  }, []);

  const signinOnSuccess = () => {
    setLoggedIn(true);
  };

  const signoutOnClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setSearchResults([]);
    message.success("Successfully Signed out");
  };

  const handleSearch = async (query) => {
    console.log("handleSearch called with query:", query);
    try {
      const resp = await searchItems(query);
      setSearchResults(resp || []);

      if (!resp || resp.length === 0) {
        message.info("No matching results found!");
      }
    } catch (error) {
      message.error(error.message || "An error occurred during the search.");
    }
  };

  const resetSearch = () => {
    setSearchResults([]); // 重置搜索结果
  };

  return (
    <>
      <Router>
        <Layout>
          <Header>
            <PageHeader
              loggedIn={loggedIn}
              signoutOnClick={signoutOnClick}
              signinOnSuccess={signinOnSuccess}
              onSearch={handleSearch}
              resetSearch={resetSearch}
            />
          </Header>
        </Layout>
        <Layout>
          <Content>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    loggedIn={loggedIn}
                    onLoginSuccess={signinOnSuccess}
                    searchResults={searchResults}
                    isSearchPerformed={searchResults.length > 0}
                  />
                }
              />
              <Route path="/sell" element={<Sell />} />
              <Route path="/purchase-history" element={<Purchase />} />
              <Route path="/selling" element={<Selling />} />
              <Route path="/item/:id" element={<Detail />} />
            </Routes>
          </Content>
        </Layout>
        <LogoutRedirect loggedIn={loggedIn} />
      </Router>
    </>
  );
}

export default App;
