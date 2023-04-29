import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

export const SearchContext = React.createContext();

export default function App() {
    const [searchPizza, setSearchPizza] = React.useState("");

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchPizza, setSearchPizza }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <Home
                                    searchPizza={searchPizza}
                                    setSearchPizza={setSearchPizza}
                                />
                            }
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

