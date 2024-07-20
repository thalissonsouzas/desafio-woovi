import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; // Importar o Footer se necessário

function CardPayment() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const user = localStorage.getItem('userName') || '';
  const leftPayment = (localStorage.getItem('paymentOption')[0]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione aqui a lógica para processar o pagamento

    // Exemplo de redirecionamento para uma página de sucesso ou confirmação
    navigate('/payment-success');
  };

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-200 rounded-lg text-center">
      <h1 className="text-xl font-extrabold text-gray-700 mb-4">{user}, pague o restante em {leftPayment-1}x no cartão</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-left mb-1 text-gray-700">Número do Cartão</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div>
          <label htmlFor="cardName" className="block text-left mb-1 text-gray-700">Nome do Titular</label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Nome do Titular"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-left mb-1 text-gray-700">Data de Validade</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="MM/AA"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-left mb-1 text-gray-700">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="123"
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-left">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-customblue text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Pagar
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default CardPayment;
