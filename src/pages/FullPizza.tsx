import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        name: string;
        price: number;
    }>();
    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const piazzaById = await axios.get(`https://644bf1bc4bdbc0cc3a9e9d4f.mockapi.io/pizzas/${id}`);
                setPizza(piazzaById.data);
            } catch (error) {
                alert("Ошибка при получении питсы");
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return (
            <center>
                <h1>
                    Загрузка...
                    <br />
                    <Link to="/">&larr; Вернуться назад</Link>
                </h1>
            </center>
        );
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
