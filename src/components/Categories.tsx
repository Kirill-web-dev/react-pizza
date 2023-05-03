import React from "react";

type CategoriesProps = {
    value: number;
    onChangeCategory: any;
};

// Типизация пропсов

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
    const listOfCategories: string[] = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые"];

    return (
        <div className="categories">
            <ul>
                {listOfCategories.map((categoryTitle, index) => (
                    <li
                        key={index}
                        onClick={() => onChangeCategory(index)}
                        className={value === index ? "active" : ""}
                    >
                        {categoryTitle}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
