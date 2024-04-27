import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./pages/login.component";
import Register from "./pages/register.component";
import Home from "./pages/home.component";
import Profile from "./pages/profile.component";
import HomePage from "./pages/customer/homePage";
import BoardModerator from "./pages/board-moderator.component";
import BoardAdmin from "./pages/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import SellerDashBoard from "./pages/seller/sellerDashBoard";
import ManagerProducts from "./pages/seller/manageProducts";
import LineChart from "./pages/seller/components/LineChart";
import SearchPage from "./pages/customer/searchPage";
import ViewDetailsProductPage from "./pages/customer/viewDetailsProductsPage";
import AddProductPage from "./pages/seller/addProductPage";
import EditProductPage from "./pages/seller/editProduct";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      // <div>
      //   <nav className="navbar navbar-expand navbar-dark bg-dark">
      //     <Link to={"/"} className="navbar-brand">
      //       bezKoder
      //     </Link>
      //     <div className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <Link to={"/home"} className="nav-link">
      //           Home
      //         </Link>
      //       </li>

      //       {showModeratorBoard && (
      //         <li className="nav-item">
      //           <Link to={"/mod"} className="nav-link">
      //             Moderator Board
      //           </Link>
      //         </li>
      //       )}

      //       {showAdminBoard && (
      //         <li className="nav-item">
      //           <Link to={"/admin"} className="nav-link">
      //             Admin Board
      //           </Link>
      //         </li>
      //       )}

      //       {currentUser && (
      //         <li className="nav-item">
      //           <Link to={"/user"} className="nav-link">
      //             User
      //           </Link>
      //         </li>
      //       )}
      //     </div>

      //     {currentUser ? (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link to={"/profile"} className="nav-link">
      //             {currentUser.username}
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <a href="/login" className="nav-link" onClick={this.logOut}>
      //             LogOut
      //           </a>
      //         </li>
      //       </div>
      //     ) : (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link to={"/login"} className="nav-link">
      //             Login
      //           </Link>
      //         </li>

      //         <li className="nav-item">
      //           <Link to={"/register"} className="nav-link">
      //             Sign Up
      //           </Link>
      //         </li>
      //       </div>
      //     )}
      //   </nav>

      //   <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<HomePage />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
        <Route path="/seller" element={<SellerDashBoard />} />
        <Route path="/seller/managerProducts" element={<ManagerProducts />} />
        <Route path="/test" element={<LineChart />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detailsProduct" element={<ViewDetailsProductPage />} />
        <Route path="/seller/addProduct" element={<AddProductPage />} />
        <Route path="/seller/editProduct/:id" element={<EditProductPage />} />
      </Routes>
      //   </div>

      //   {/* <AuthVerify logOut={this.logOut}/> */}
      // </div>
    );
  }
}

export default App;
