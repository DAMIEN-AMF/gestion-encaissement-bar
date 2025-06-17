import React, { useState } from 'react';
import './style.css';
import logo from './assets/logo.png';

const products = {
  Soft: [
    { name: 'Pepsi', price: 4 },
    { name: 'Pepsi Max', price: 4 },
    { name: 'Ice Tea Pêche', price: 4 },
    { name: '7 Up Zéro', price: 4 },
    { name: 'Liptonic', price: 4 },
    { name: 'Red Bull', price: 5 },
    { name: 'Red Bull Sans Sucre', price: 5 },
    { name: 'Red Bull Abricot-Fraise', price: 5 },
    { name: 'Red Bull Red Edition (pastèque)', price: 5 },
    { name: 'Cristaline', price: 3 },
    { name: 'San Pellegrino', price: 3 },
  ],
  Bière: [
    { name: 'FADA 50cl', price: 8 },
    { name: 'FADA 150cl Blonde', price: 22 },
    { name: 'FADA 150cl Blanche', price: 22 },
    { name: 'FADA 150cl Abricot', price: 22 },
    { name: 'FADA 150cl IPA', price: 22 }
  ],
  Alcool: [
    { name: 'Vin Rosé (12cl)', price: 4 },
    { name: 'Vin Blanc (12cl)', price: 4 },
    { name: 'Champagne (12cl)', price: 8 },
    { name: 'Spritz (25cl)', price: 12 },
    { name: 'Spritz Rosé (25cl)', price: 12 }
  ],
  Consigne: [
    { name: 'Consigne verre', price: 1 },
    { name: 'Consigne eco-cup', price: 2 }
  ]
};

function App() {
  const [selectedTab, setSelectedTab] = useState('Soft');
  const [cart, setCart] = useState({});
  const total = Object.entries(cart).reduce((sum, [name, quantity]) => {
    const item = Object.values(products).flat().find(p => p.name === name);
    return sum + (item?.price || 0) * quantity;
  }, 0);

  const updateQuantity = (name, delta) => {
    setCart(prev => {
      const qty = (prev[name] || 0) + delta;
      if (qty <= 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: qty };
    });
  };

  return (
    <div className="app">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Encaissement - Bar 1</h1>
      <div className="tabs">
        {Object.keys(products).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedTab(cat)}
            className={selectedTab === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="product-list">
        {products[selectedTab].map(({ name, price }) => (
          <div key={name} className="product">
            <span>{name} - {price} €</span>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(name, -1)}>-</button>
              <input
                type="number"
                value={cart[name] || 0}
                onChange={(e) =>
                  updateQuantity(name, parseInt(e.target.value || 0) - (cart[name] || 0))
                }
              />
              <button onClick={() => updateQuantity(name, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="total">Total : {total} €</div>
    </div>
  );
}

export default App;