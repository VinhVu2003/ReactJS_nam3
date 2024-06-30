import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { routeAd, routeLogin, routeUser } from "./router";
import { Route, Routes, useLocation } from "react-router-dom";
import Admin from "./shared/ad";
import Footer from "./shared/footer";
import Header from "./shared/header";

function App() {
  const location = useLocation();
  const isAdmin: boolean = location.pathname.includes("admin");
  const isUser: boolean = location.pathname.includes("user");
  // console.log(routeAd,routeUser)
  // console.log(location);
  const renderRoutes = (routes: any) => {
    return routes.map((route: any, index: number) => {
      const Page = route.Component;
      return <Route key={index} path={route.path} element={<Page />} />;
    });
  };

  if (isAdmin) {
    return (
      <Admin>
        <Routes>{renderRoutes(routeAd)}</Routes>
        
      </Admin>
    );
  } else if (isUser) {
    return (
      <>
      <Header />
      <Routes>{renderRoutes(routeUser)}</Routes>
      <Footer />
    </>
     

    );
  } else {
    return (
      <Routes>{renderRoutes(routeLogin)}</Routes>
    );
  }
}

export default App;
