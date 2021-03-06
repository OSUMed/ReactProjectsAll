import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Favorites from "./components/favorites";
import NotFound from "./components/NotFound";
import Home from "./components/home";
import Cart from "./components/mycart";
import { PageContext } from "./helpers/Context";
import React, { useState, useEffect, useContext, Component } from "react";
import "./App.css";

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [onSaleGames, setonSaleGames] = useState([]);
  const [test, testGroup] = useState("Hello");
  const [favorites, setFavorites] = useState([]);
  const [titleId, settitleId] = useState(0);
  const [cartId, setcartId] = useState(0);

  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [totalprice, setTotalPrice] = useState(0);
  const [cartTotalItems, setcartTotalItems] = useState(0);
  const [perPage, setperPage] = useState(5);
  const [pages, setPages] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  // const [paginatedPage, setpaginatedPage] = useState([]);

  const activePage = (page) => {
    return page === currentPage ? "page-item active" : "page-item";
  };

  // const paginate = () => {
  //   let startIndex = (currentPage - 1) * 5;
  //   let newpaginatedPage = onSaleGames.slice(startIndex, startIndex + 5);
  //   setpaginatedPage(newpaginatedPage);
  //   forceUpdate();
  // };

  const changePage = (page) => {
    return page > pages || page === 0 ? null : setcurrentPage(page);
  };

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        //console.log("searched games: ", data);
        setSearchedGames(data);
      });
  };

  const appendFavorites = (gameTitle, gameThumb, cheapestPrice, gameLink) => {
    let checkfavorites = [...favorites];
    console.log("check favorites: ", checkfavorites);
    if (checkfavorites.length == 0) {
      settitleId(titleId + 1);
      checkfavorites.push({
        title: gameTitle,
        id: titleId,
        img: gameThumb,
        cprice: cheapestPrice,
        stock: 0,
        fullgameLink: gameLink,
      });
      return setFavorites(checkfavorites);
    }
    for (let i = 0; i < checkfavorites.length; i++) {
      if (gameTitle == checkfavorites[i].title) {
        return console.log(
          "we found a duplicate favorite add: ",
          checkfavorites[i].title,
          gameTitle
        );
      }
    }
    settitleId(titleId + 1);
    let currentFavorites = [...favorites];
    currentFavorites.push({
      title: gameTitle,
      id: titleId,
      img: gameThumb,
      cprice: cheapestPrice,
      stock: 0,
      fullgameLink: gameLink,
    });
    setFavorites(currentFavorites);
  };

  const addToCart = (
    gameId,
    gameTitle,
    gameThumb,
    cheapestPrice,
    stock,
    fullgameLink1
  ) => {
    setcartId(cartId + 1);
    let cartItems = [...cart];
    let newStock = stock + 1;
    cartItems.push({
      id: cartId,
      title: gameTitle,
      img: gameThumb,
      cartprice: cheapestPrice,
      cartStock: newStock,
      fullLink: fullgameLink1,
    });
    console.log("here is my cart: ", cart);
    setCart(cartItems);
  };

  const emptyCart = (e) => {
    let removeItems = [...cart];
    while (removeItems.length > 0) {
      removeItems.pop();
    }
    setCart(removeItems);
    setCheckout(false);
  };
  const onFavDelete = (selected) => {
    let filteredFavorites = [...favorites];
    filteredFavorites = favorites.filter(
      (unselected) => unselected.id != selected
    );

    setFavorites(filteredFavorites);
  };

  const onCartDelete = (selected) => {
    let filteredFavorites = [...cart];
    filteredFavorites = cart.filter((unselected) => unselected.id != selected);

    setCart(filteredFavorites);
  };
  const toggleCheckout = (e) => {
    if (!checkout) {
      return setCheckout(true);
    }
    return setCheckout(false);
  };

  return (
    <PageContext.Provider
      value={{
        gameTitle,
        setGameTitle,
        searchedGames,
        setSearchedGames,
        onSaleGames,
        setonSaleGames,
        searchGame,
        test,
        favorites,
        setFavorites,
        appendFavorites,
        onFavDelete,
        cart,
        setCart,
        addToCart,
        onCartDelete,
        checkout,
        setCheckout,
        toggleCheckout,
        totalprice,
        setTotalPrice,
        cartTotalItems,
        setcartTotalItems,
        cartId,
        setcartId,
        emptyCart,
        setPages,
        pages,
        changePage,
        currentPage,
        setcurrentPage,
        activePage,
      }}
    >
      <div>
        <NavBar />
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/favorites" component={Favorites}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </PageContext.Provider>
  );
}

export default App;

// <BrowserRouter>
// <Switch>

// </Switch>
// </BrowserRouter>
