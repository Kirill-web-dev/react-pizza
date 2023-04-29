import React from "react";

import Styles from "./NotFoundedBlock.module.scss"

function NotFoundedBlock() {
    console.log(Styles.root);

    return (
        <div className={Styles.root}>
            <h1>
                <span>😔</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={Styles.description}>Такой страницы не существует</p>
        </div>
    );
}

export default NotFoundedBlock;
