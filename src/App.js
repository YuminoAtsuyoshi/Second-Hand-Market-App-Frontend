import React, { useState } from "react";
import { Layout, message } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Purchase from "./pages/Purchase";
import Selling from "./pages/Selling";
import Detail from "./pages/Detail";

const { Header, Content } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const signinOnSuccess = () => {
    setLoggedIn(true);
  };

  const signoutOnClick = () => {
    localStorage.removeItem("authToken");
    setLoggedIn(false);
    message.success("Successfully Signed out");
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
              <Route path="/purchase-history" element={<Purchase />} />
              <Route path="/selling" element={<Selling />} />
              <Route path="/item/:id" element={<Detail />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </>
  );
}

export default App;
