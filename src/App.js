import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./components/layouts/MainLayout";

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<MainLayout />}
            >
                <Route
                    exact
                    path=""
                    element={<Home />}
                />
                <Route
                    path="cart"
                    element={<Cart />}
                />
                <Route
                    path="pizzas/:id"
                    element={<FullPizza />}
                />
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Route>
        </Routes>
    );
}
