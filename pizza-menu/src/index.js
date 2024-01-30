import { React, StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import pizzaData from './data.js';
import './index.css'

// {
//     name: "Focaccia",
//     ingredients: "Bread with italian olive oil and rosemary",
//     price: 6,
//     photoName: "pizzas/focaccia.jpg",
//     soldOut: false,
//   },

function App() {
    return (
        <div className="container">
            < Header />
            < Menu />
            < Footer />
        </div>
    )
}

function Pizza(props) {
    return (
        <div>
            <img src='pizzas/spinaci.jpg' alt="Pizza Spinaci"></img>
            <h3>Pizza</h3>
            <p>something, something, something...</p>
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

    return (
        <main className='menu'>
            <h2>Our Menu:</h2>
            <Pizza />
            <Pizza />
            <Pizza />
            <Pizza />
        </main>
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

    // return createElement('footer', null, "we're currently open!")
    return (<footer className='footer'>{new Date().toLocaleTimeString()} We're currently open!</footer>)
}

const root = createRoot(document.getElementById("root"));
root.render(<StrictMode><App /></StrictMode>);