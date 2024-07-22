import { useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react'; // Biblioteca para gerar QR Code
import logo from '../assets/logo.svg';
import Footer from '../components/Footer';
import PrazoPagamento from '../components/PrazoPagamento';
import copyImage from '../assets/copyImage.svg';
import Timer from '../components/Timer';


function PixPage() {
  const [showSuccessBar, setShowSuccessBar] = useState(false);

  const paymentOption = localStorage.getItem('paymentOption') || '2x';
  const totalValue = localStorage.getItem('totalValue') || 'R$ 0,00';
  const installmentValue = localStorage.getItem('installmentValue') || 'R$ 0,00';
  const userName = localStorage.getItem('userName') || 'Usuário';

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
    setShowSuccessBar(true);
    
    // Esconder a barra de sucesso após 5 segundos
    setTimeout(() => {
      setShowSuccessBar(false);
    }, 5000);
  };

  return (
    <div className="max-w-md mx-auto p-5 border-gray-200 rounded-lg text-center font-nunito">
      <img src={logo} alt="Logo" className="mx-auto mb-5" />
      {paymentOption === '1x' ? (
        <h1 className="text-xl font-extrabold text-gray-700">
          {userName}, faça o pagamento único via Pix
        </h1>
      ) : (
        <h1 className="text-xl font-extrabold text-gray-700">
          {userName}, pague a entrada de
          <br />
          {installmentValue} pelo Pix
        </h1>
      )}
      <div className="flex flex-col items-center">
        <QRCode value={generateQrCode()} size={300} className="flex m-4" />
        <button
          onClick={handleCopyQRCode} 
          className="flex mt-4 px-4 w-72 py-2 bg-customblue text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Clique para copiar QR CODE
          <img src={copyImage} alt="Copy" className="ml-2" />
        </button>
        <PrazoPagamento />
        <Timer />
      </div>
      <Footer />
      {showSuccessBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white text-center p-3 animate-slide-up">
          QR Code copiado para a área de transferência!
        </div>
      )}

    </div>
  );
}

PixPage.propTypes = {
  userName: PropTypes.string,
  purchaseValue: PropTypes.number,
};

export default PixPage;
