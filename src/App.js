import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/signup" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/dashboard" component={ProfileScreen} />
            <Route path="/" component={Homescreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
