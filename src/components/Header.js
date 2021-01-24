import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/userActions";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const logoutHandler = () => {
    //LOGOUT
    dispatch(logout());
  };

  return (
    <header class="header fixed-top">
      <div class="branding">
        <div class="container position-relative">
          <nav class="navbar navbar-expand-lg">
            <div class="site-logo">
              <Link class="navbar-brand" to="/">
                <span class="logo-text">LMA</span>
              </Link>
            </div>

            <button
              class="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span> </span>
              <span> </span>
              <span> </span>
            </button>

            <div class="collapse navbar-collapse py-3 py-lg-0" id="navigation">
              <ul class="navbar-nav ml-lg-auto">
                {userInfo ? (
                  <NavDropdown
                    title={`${user.first_name} - ${
                      user.is_superuser ? "(Admin)" : "(Employee)"
                    }`}
                    id="username"
                  >
                    <LinkContainer to="/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/">
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : (
                  <>
                    <li class="nav-item mr-lg-4">
                      <Link class="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li class="nav-item mr-lg-0 mt-3 mt-lg-0">
                      <Link
                        class="btn custom-btn-primary text-white"
                        to="/signup"
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
