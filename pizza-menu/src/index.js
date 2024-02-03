import { Fragment, React, StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
// import pizzaData from './data.js';
import './index.css'

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];


function App() {
    return (
        <div className="container">
            < Header />
            < Menu />
            < Footer />
        </div>
    )
}

function Header() {
    // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
    const style = {};


    return (
        <header className="header">
            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>
    )
}

function Menu() {

    const pizzas = pizzaData;
    // const pizzas = [];

    // React won't render true/false, but WILL render 0
    const numPizzas = pizzas.length;

    return (
        <main className='menu'>
            <h2>Our Menu:</h2>



            {numPizzas > 0 ? (
                <Fragment>
                    <p>Authentic Italian cuisine.
                        6 creative dishes to choose from.
                        All from our stone oven, all organic, all delicious.</p>

                    <ul className='pizzas'>
                        {pizzas.map((pizza) => (
                            <Pizza pizzaObject={pizza} key={pizza.name} />
                        ))}
                    </ul>
                </Fragment>
            ) : <p>We're still working on our menu. Please come back later &#128522;</p>}



            {/* <Pizza
                name='Focaccia'
                ingredients='Bread with italian olive oil and rosemary'
                price={6}
                photoName='pizzas/focaccia.jpg'
                soldOut={false}
            /> */}
        </main>
    )

}

function Pizza({ pizzaObject }) {

    // don't even render the pizza if it is sold out
    // if (pizzaObject.soldOut) return null

    return (
        // <li className={`pizza ${pizzaObject.soldOut ? 'sold-out' : ''}`}>
        <li className={pizzaObject.soldOut ? 'pizza sold-out' : 'pizza'}>
            <img src={pizzaObject.photoName} alt={pizzaObject.name}></img>
            <div>
                <h3>{pizzaObject.name}</h3>
                <p>{pizzaObject.ingredients}</p>
                <span>{pizzaObject.soldOut ? "Sold Out" : pizzaObject.price}</span>
            </div>
        </li>
    )

}

function Footer() {

    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour < closeHour;
    console.log(isOpen);

    // if (hour >= openHour && hour < closeHour)
    //     alert("We're currently open!");
    // else alert("Sorry, we're closed!");

    // if (!isOpen) {
    //     return (
    //         <p>We're happy to welcome you at {openHour}:00 !</p>
    //     )
    // } else {
    return (
        <footer className='footer'>
            {
                isOpen ? (
                    <Order closeHour={closeHour} />
                ) : <p>We're happy to welcome you at {openHour}:00 !</p>
            }
        </footer >
    )
    // }

    // return createElement('footer', null, "we're currently open!")

}

function Order({ openHour, closeHour }) {
    return (
        <div className='order'>
            <p>
                We're open until {closeHour}:00. Come visit us or order online.
            </p>
            <button className='btn'>Order</button>
        </div>
    )
}

const root = createRoot(document.getElementById("root"));
root.render(<StrictMode><App /></StrictMode>);