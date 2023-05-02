import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
    const [pizza, setPizza] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const piazzaById = await axios.get(`https://644bf1bc4bdbc0cc3a9e9d4f.mockapi.io/pizzas/${id}`);
                setPizza(piazzaById.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return "Загрузка...";
    }

    return (
        <div className="container">
            <center>
                <img
                    src={pizza.imageUrl}
                    alt="Пытса"
                />
                <h2>{pizza.name}</h2>
                <h4>{pizza.price} руб.</h4>
            </center>
        </div>
    );
};

export default FullPizza;