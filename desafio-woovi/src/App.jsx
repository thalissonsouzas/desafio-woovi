import './App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from './assets/logo.svg';
import Footer from './components/Footer';
import selectedRadioImage from './assets/selectedRadio.svg'; // Imagem personalizada para rádio selecionado
import defaultRadioImage from './assets/radioDefault.svg'; // Imagem personalizada para rádio não selecionado

const mockData = {
  userName: 'João',
  purchaseValue: 30500.00
};

function App() {
  const [paymentOption, setPaymentOption] = useState(localStorage.getItem('paymentOption') || '2x');

  const calculateInstallments = (value, numInstallments, interestRate = 0) => {
    const totalValue = value * (1 + interestRate);
    const installmentValue = totalValue / numInstallments;
    return {
      installment: installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      total: totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };
  };

  const paymentOptions = [
    { label: '1x', installments: 1, interestRate: 0.00 },
    { label: '2x', installments: 2, interestRate: 0.02 },
    { label: '3x', installments: 3, interestRate: 0.04 },
    { label: '4x', installments: 4, interestRate: 0.06 },
    { label: '5x', installments: 5, interestRate: 0.08 },
    { label: '6x', installments: 6, interestRate: 0.10 },
    { label: '7x', installments: 7, interestRate: 0.12 }
  ];

  useEffect(() => {
    const option = paymentOptions.find(option => option.label === paymentOption);
    if (option) {
      const { total, installment } = calculateInstallments(mockData.purchaseValue, option.installments, option.interestRate);
      localStorage.setItem('userName', mockData.userName);
      localStorage.setItem('paymentOption', paymentOption);
      localStorage.setItem('totalValue', total);
      localStorage.setItem('installmentValue', installment);
      localStorage.setItem('interestRate', option.interestRate);
    }
  }, [paymentOption]);

  const handleOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  return (
    <div className="flex justify-center items-center p-0">
      <div className="border-gray-200 text-center p-0 bg-white max-w-screen-sm w-full">
        <img src={logo} alt="Logo" className="mx-auto mb-4" />
        <h1 className="text-lg sm:text-xl font-extrabold text-gray-700">
          {mockData.userName}, como você quer pagar?
        </h1>
        <div className="text-left">
          <div className="mb-4 sm:mb-5 mt-4 sm:mt-6">
            <div className="flex items-center font-bold text-base sm:text-lg relative">
              <span className="absolute bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-xs sm:text-sm ml-2">Pix</span>
            </div>
            <label className={`flex items-center p-2 sm:p-3 border rounded-lg mb-2 cursor-pointer transition duration-300 
              ${paymentOption === '1x' ? 'border-emerald-500' : 'border-gray-200'}
              hover:border-emerald-400
            `}>
              <div className="flex flex-col">
                {`1x ${mockData.purchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                <span className="text-emerald-400">Ganhe <span className="font-extrabold">3%</span> de Cashback</span>
                <div className="relative flex items-center bg-customblue text-xs sm:text-sm md:text-base text-white w-full pl-2 pr-4 sm:pr-6 whitespace-nowrap">
                  <div className="font-semibold mr-1">🤑 R$ 300,00</div>
                  <div>de volta no seu Pix na hora</div>
                </div>
              </div>
              <input
                type="radio"
                name="paymentOption"
                value="1x"
                checked={paymentOption === '1x'}
                onChange={handleOptionChange}
                className="form-radio absolute opacity-0 peer"
              />
              <img 
                src={paymentOption === '1x' ? selectedRadioImage : defaultRadioImage} 
                alt="Radio Button"
                className={`w-6 h-6 ml-2 ${paymentOption === '1x' ? 'block' : 'hidden'} peer-checked:block`}
              />
            </label>
          </div>
          <div className="">
            <div className="flex items-center font-bold text-base sm:text-lg relative">
              <span className="absolute bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-xs sm:text-sm ml-2">Pix Parcelado</span>
            </div>
            {paymentOptions.filter(option => option.label !== '1x').map((option, index) => (
              <label
                key={option.label}
                className={`flex items-center p-3 border cursor-pointer transition duration-300
                  ${paymentOption === option.label ? 'border-emerald-500' : 'border-gray-200'}
                  ${index === 0 ? 'rounded-t-lg border-b-0' : ''}
                  ${index === paymentOptions.length - 2 ? 'rounded-b-lg' : '-mb-px'}
                `}
              >
                <div className='flex flex-col'>
                  {`${option.label} ${calculateInstallments(mockData.purchaseValue, option.installments, option.interestRate).installment} `}
                  <span className="text-gray-500 text-sm">Total {calculateInstallments(mockData.purchaseValue, option.installments, option.interestRate).total}</span>
                  {option.label === '4x' && (
                    <div className="relative flex items-center bg-customblue text-white w-full pl-2 pr-2 mt-2 whitespace-nowrap">
                      <div className="font-semibold mr-1 text-xs sm:text-sm md:text-base">3% de juros:</div>
                      <div className="text-xs sm:text-sm md:text-base">Melhor opção de parcelamento</div>
                      {/* <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-white h-5 w-5 rotate-45"></div> */}
                    </div>
                  )}
                </div>
                <input
                  type="radio"
                  name="paymentOption"
                  value={option.label}
                  checked={paymentOption === option.label}
                  onChange={handleOptionChange}
                  className='form-radio absolute opacity-0 peer'
                />
                <img 
                  src={paymentOption === option.label ? selectedRadioImage : defaultRadioImage} 
                  alt="Radio Button"
                  className={`w-6 h-6 ml-2 ${paymentOption === option.label ? 'block' : 'hidden'} peer-checked:block ml-auto mr-2`}
                />
              </label>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Link to="/pixpage">
              <button className="px-4 py-2 bg-customblue text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                Ir para a página de pagamento
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
