import React from "react";

export default function Categories() {
    const [selectCategory, setSelectCategory] = React.useState();
    const listCategoryTitles = [ 
        "Все", 
        "Мясные", 
        "Вегетарианская", 
        "Гриль", 
        "Острые", 
        "Закрытые",
    ];

    const onClickCategory = (index) => {
        setSelectCategory(index)
    };

    return (
        <div className="categories">
            <ul>
                {listCategoryTitles.map((categoryTitle, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={selectCategory === index ? "active" : null}
                    >
                        {categoryTitle}
                    </li>
                ))}
            </ul>
        </div>
    );
}

