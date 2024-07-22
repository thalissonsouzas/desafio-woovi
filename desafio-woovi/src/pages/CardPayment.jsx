import { useState } from 'react';
import Footer from '../components/Footer'; // Importar o Footer se necessário
import PrazoPagamento from '../components/PrazoPagamento';

function CardPayment() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cpf, setCpf] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const user = localStorage.getItem('userName') || '';
  const leftPayment = (parseInt(localStorage.getItem('paymentOption')[0], 10) - 1) || 1; // Corrigir o cálculo das parcelas restantes


  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length <= 16) {
      setCardNumber(value);
      validateCardNumber(value);
    }
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove caracteres não alfabéticos
    setCardName(value);
    validateCardName(value);
  };

  const handleCpfChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length <= 11) {
      setCpf(value);
      validateCpf(value);
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/[^0-9\/]/g, ''); // Remove caracteres não numéricos e "/"
    if (value.length <= 5) {
      setExpiryDate(value);
      validateExpiryDate(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length <= 3) {
      setCvv(value);
      validateCvv(value);
    }
  };

  const validateCardNumber = (value) => {
    if (value.length === 16) {
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: 'Número do cartão deve ter 16 dígitos.' }));
    }
  };

  const validateCardName = (value) => {
    if (value.length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, cardName: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cardName: 'Nome completo é obrigatório.' }));
    }
  };

  const validateCpf = (value) => {
    if (value.length === 11) {
      setErrors((prevErrors) => ({ ...prevErrors, cpf: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cpf: 'CPF deve ter 11 dígitos.' }));
    }
  };

  const validateExpiryDate = (value) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (expiryRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, expiryDate: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, expiryDate: 'Data de validade inválida. Use o formato MM/AA.' }));
    }
  };

  const validateCvv = (value) => {
    if (value.length === 3) {
      setErrors((prevErrors) => ({ ...prevErrors, cvv: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cvv: 'CVV deve ter 3 dígitos.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos os campos antes de processar o pagamento
    validateCardNumber(cardNumber);
    validateCardName(cardName);
    validateCpf(cpf);
    validateExpiryDate(expiryDate);
    validateCvv(cvv);

    if (Object.values(errors).every((error) => error === '')) {
      // Adicione aqui a lógica para processar o pagamento, por exemplo, uma chamada à API

      // Definir o estado de sucesso do pagamento
      setPaymentSuccess(true);

      
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-200 rounded-lg text-center">
      <h1 className="text-xl font-extrabold text-gray-700 mb-4">
        {user}, pague o restante em {leftPayment}x no cartão
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-left mb-1 text-gray-700">Nome Completo</label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={handleCardNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Nome Completo"
            required
          />
          {errors.cardName && <p className="text-red-500 text-left">{errors.cardName}</p>}
        </div>
        <div>
          <label htmlFor="cpf" className="block text-left mb-1 text-gray-700">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={handleCpfChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="000.000.000-00"
            required
          />
          {errors.cpf && <p className="text-red-500 text-left">{errors.cpf}</p>}
        </div>
        <div>
          <label htmlFor="cardNumber" className="block text-left mb-1 text-gray-700">Número do Cartão</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="1234 5678 9012 3456"
            maxLength="16"
            required
          />
          {errors.cardNumber && <p className="text-red-500 text-left">{errors.cardNumber}</p>}
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-left mb-1 text-gray-700">Vencimento</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="MM/AA"
              maxLength="5"
              required
            />
            {errors.expiryDate && <p className="text-red-500 text-left">{errors.expiryDate}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-left mb-1 text-gray-700">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="123"
              maxLength="3"
              required
            />
            {errors.cvv && <p className="text-red-500 text-left">{errors.cvv}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-customblue text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Pagar
        </button>
      </form>
      {paymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="p-4 w-1/4 bg-green-500 text-white rounded-lg shadow-lg">
            Pagamento concluído com SUCESSO!
          </div>
        </div>
      )}
      <PrazoPagamento />
      <Footer />
    </div>
  );
}

export default CardPayment;
