import React from "react";

export default function Categories({ categoryValue, onChangeCategory }) {
    const listOfCategories = [ 
        "Все", 
        "Мясные", 
        "Вегетарианская", 
        "Гриль", 
        "Острые", 
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {listOfCategories.map((categoryTitle, index) => (
                    <li
                        key={index}
                        onClick={() => onChangeCategory(index)}
                        className={categoryValue === index ? "active" : null}
                    >
                        {categoryTitle}
                    </li>
                ))}
            </ul>
        </div>
    );
}

