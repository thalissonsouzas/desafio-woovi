import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // Biblioteca para gerar QR Code
import logo from '../assets/logo.svg';
import Footer from '../components/Footer';
import PrazoPagamento from '../components/PrazoPagamento';
import PixApproved from '../components/PixApproved'; // Importe o novo componente

function PixPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const paymentOption = localStorage.getItem('paymentOption') || '2x';
  const totalValue = localStorage.getItem('totalValue') || 'R$ 0,00';
  const installmentValue = localStorage.getItem('installmentValue') || 'R$ 0,00';
  const userName = localStorage.getItem('userName') || 'Usuário';
  const taxaJuros = localStorage.getItem('interestRate') || '0,00';

  const generateQrCode = () => {
    let qrValue = '';
    if (paymentOption === '1x') {
      qrValue = `PIX-PAGAMENTO-ÚNICO-${totalValue}`;
    } else {
      qrValue = `PIX-PARCELA-ENTRADA-${installmentValue}`;
    }
    return qrValue;
  };

  const handleCopyQRCode = () => {
    navigator.clipboard.writeText(generateQrCode());
    alert('QR Code copiado para a área de transferência!');
    
    // Exibir a mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setShowSuccessMessage(true);
    }, 5000);
  };

  function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-200 rounded-lg text-center">
      <img src={logo} alt="Logo" className="mx-auto mb-5" />
      {paymentOption === '1x' ? (
        <h1 className="text-xl font-extrabold text-gray-700">
          {userName}, faça o pagamento único via Pix
        </h1>
      ) : (
        <h1 className="text-xl font-extrabold text-gray-700">
          {userName}, pague a entrada de
          <br />
          R$ {installmentValue} pelo Pix
        </h1>
      )}
      <div className="flex flex-col items-center">
        <QRCode value={generateQrCode()} size={300} className="flex m-4" />
        <button
          onClick={handleCopyQRCode} 
          className="mt-4 px-4 w-72 py-2 bg-customblue text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Clique para copiar QR CODE
        </button>
        <PrazoPagamento />
      </div>
      <section>
        {paymentOption === '1x' ? ( 
          <p>Pagamento via Pix</p>
        ) : (
          <ul>
            <p>1ª entrada no Pix</p>
            <p>2ª no cartão</p>
          </ul>
        )}
        <div>CET {taxaJuros * 100}%</div>
        <p>Total: {totalValue}</p>
      </section>

      <p className="border m-0 p-0 w-full -mx-5 text-base leading-[21.82px] font-semibold text-center font-nunito">Como funciona?</p>

      <p className="text-base leading-[21.82px] font-semibold text-center font-nunito text-softgray">Identificador:</p>
      <code className="text-base leading-[21.82px] font-semibold text-center font-nunito text-gray-700">{generateRandomString(32)}</code>

      <PixApproved 
        isVisible={showSuccessMessage} 
        onClose={() => setShowSuccessMessage(false)} 
        onAfterClose={() => setShowSuccessMessage(false)} // Chama o redirecionamento
      />

      <Footer />
    </div>
  );
}

export default PixPage;
