import React, { useState } from "react";
import { Layout, message } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import Home from "./pages/Home";
import Sell from "./pages/Sell";

const { Header, Content } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("logout");
      }, 1000);
    });
  };

  const signinOnSuccess = () => {
    setLoggedIn(true);
  };

  const signoutOnClick = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
        message.success("Successfully Signed out");
      })
      .catch((err) => {
        message.error(err.message);
      });
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
            />
          </Header>
        </Layout>
        <Layout>
          <Content>
            <Routes>
              <Route
                path="/"
                element={<Home onLoginSuccess={signinOnSuccess} />}
              />
              <Route path="/sell" element={<Sell />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </>
  );
}

export default App;
