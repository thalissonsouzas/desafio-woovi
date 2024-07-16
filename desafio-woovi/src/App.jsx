import './App.css'
import React, { useState } from 'react'

import logo from './assets/logo.svg'

const mockData = {
  userName: 'João',
  purchaseValue: 30500.00
};

function App() {
  const [selectedOption, setSelectedOption] = useState('2x');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const calculateInstallments = (value, numInstallments, interestRate = 0) => {
    const totalValue = value * (1 + interestRate);
    const installmentValue = totalValue / numInstallments;
    return {
      installment: installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      total: totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };
  };

  const paymentOptions = [
    { label: '2x', installments: 2, interestRate: 0.02},
    { label: '3x', installments: 3, interestRate: 0.04 },
    { label: '4x', installments: 4, interestRate: 0.06 },
    { label: '5x', installments: 5, interestRate: 0.08 },
    { label: '6x', installments: 6, interestRate: 0.10},
    { label: '7x', installments: 7, interestRate: 0.12 }
  ];

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-200 rounded-lg text-center">
      <img src={logo} alt="Logo" className="mx-auto mb-5" />
      <h1 className="text-xl font-extrabold text-gray-700">
        {mockData.userName}, como você quer pagar?
      </h1>
      <div className="text-left">
        <div className="mb-5 mt-6">
          <div className="flex items-center font-bold text-lg">
            <span className="absolute bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm ml-2">Pix</span>
          </div>
          <label className="flex items-center p-3 border border-gray-200 rounded-lg mb-2 cursor-pointer hover:border-emerald-400 transition duration-300">
            <div className="flex flex-col">
              {`1x ${mockData.purchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
              <span className="text-emerald-400">Ganhe <span className="font-extrabold">3%</span> de Cashback</span>
              <div className="relative flex items-center bg-customblue text-white w-full pr-14">
                <div className="font-semibold mr-1">🤑 R$ 300,00</div>
                <div>de volta no seu Pix na hora</div>
                <div className="absolute left-full base-2 h-5 w-5 bg-white transform rotate-45 -translate-x-0"></div>
              </div>
            </div>
            <input
              type="radio"
              name="paymentOption"
              value="1x"
              checked={selectedOption === '1x'}
              onChange={handleOptionChange}
            />
          </label>

          
        </div>
        <div className="border border-gray-200 rounded-lg">
          <div className="flex items-center mb-2 font-bold text-lg">
            <span className="absolute bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm ml-2">Pix Parcelado</span>
          </div>
          {paymentOptions.map(option => (
            <label key={option.label} className="flex items-center p-3 border-b border-gray-200 mb-2 cursor-pointer hover:border-emerald-400 transition duration-300">
              <div className='flex flex-col'>
                {`${option.label} ${calculateInstallments(mockData.purchaseValue, option.installments, option.interestRate).installment} `}
                <span className="text-gray-500">Total {calculateInstallments(mockData.purchaseValue, option.installments, option.interestRate).total}</span>
              </div>
              <input
                type="radio"
                name="paymentOption"
                value={option.label}
                checked={selectedOption === option.label}
                onChange={handleOptionChange}
                className='flex flex-r'
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
