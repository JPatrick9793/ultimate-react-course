import { useState } from "react";

export function Form({ onAddItems }) {

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);


    function handleSubmit(event) {
        event.preventDefault();

        if (!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() };
        console.log(`Item added:`);
        console.log(newItem);

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);

    }

    return (
        <form className="add-form" name="myForm" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select
                name="mySelection"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map(
                    (num) => (
                        <option value={num} key={num}>
                            {num}
                        </option>
                    )
                )}
            </select>
            <input
                type="text"
                placeholder="Item..."
                name="myInput"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></input>
            <button>Add</button>
        </form>
    );
}
