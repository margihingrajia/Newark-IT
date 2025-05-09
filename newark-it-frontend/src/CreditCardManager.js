// CreditCardManager.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreditCardManager({ customerId }) {
  const [cards, setCards] = useState([]);
  const [cardForm, setCardForm] = useState({ CardNumber: "", CardType: "", ExpiryDate: "" });

  const fetchCards = () => {
    axios.get(`/api/customers/${customerId}/cards`).then(res => setCards(res.data));
  };

  useEffect(() => { fetchCards(); }, [customerId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(`/api/customers/${customerId}/cards`, cardForm);
    setCardForm({ CardNumber: "", CardType: "", ExpiryDate: "" });
    fetchCards();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/cards/${id}`);
    fetchCards();
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Credit Cards</h2>
      <form onSubmit={handleAdd} className="mb-4">
        {Object.entries(cardForm).map(([key, val]) => (
          <input
            key={key}
            name={key}
            value={val}
            onChange={e => setCardForm({ ...cardForm, [e.target.name]: e.target.value })}
            placeholder={key}
            className="w-full mb-2 p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Add Card</button>
      </form>
      <ul>
        {cards.map(card => (
          <li key={card.CardID} className="mb-2 flex justify-between">
            <span>{card.CardType} ending in {card.CardNumber.slice(-4)}</span>
            <button onClick={() => handleDelete(card.CardID)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}