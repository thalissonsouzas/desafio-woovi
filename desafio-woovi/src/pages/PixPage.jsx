import { useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react'; // Biblioteca para gerar QR Code
import logo from '../assets/logo.svg';
import Footer from '../components/Footer';
import PrazoPagamento from '../components/PrazoPagamento';
import copyImage from '../assets/copyImage.svg';

function PixPage() {
  const [showSuccessBar, setShowSuccessBar] = useState(false);

  const paymentOption = localStorage.getItem('paymentOption') || '2x';
  const totalValue = localStorage.getItem('totalValue') || 'R$ 0,00';
  const installmentValue = localStorage.getItem('installmentValue') || 'R$ 0,00';
  const userName = localStorage.getItem('userName') || 'Usuário';
  const taxaJuros = localStorage.getItem('interestRate') || '0,00';

  const numberOfInstallments = parseInt(paymentOption, 10); // Número de parcelas
  const installments = Array.from({ length: numberOfInstallments }, (_, index) => index + 1);

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

  function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }

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
      </div>
      <section>
        {paymentOption === '1x' ? ( 
          <p>Pagamento via Pix</p>
        ) : (
          <ul className="list-disc list-inside">
            {installments.map((installmentNumber) => (
              <li key={installmentNumber} className="flex justify-between text-gray-500 text-sm font-semibold">
                <p>
                  {installmentNumber === 1
                    ? '1ª entrada no Pix'
                    : `${installmentNumber}ª parcela no cartão`}
                </p>
                <p className="font-bold text-gray-700">{installmentValue}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between w-full font-semibold text-center font-nunito">
          <div>CET {taxaJuros * 100}%</div>
          <p className="font-bold text-gray-700">Total: {totalValue}</p>
        </div>
      </section>

      <p className="p-0 w-full font-semibold text-left font-nunito my-3">Como funciona?</p>

      <p className="text-base leading-[21.82px] font-semibold text-center font-nunito text-softgray">Identificador:</p>
      <code className="text-base leading-[21.82px] font-semibold text-center font-nunito text-gray-700">{generateRandomString(32)}</code>

      {showSuccessBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white text-center p-3 animate-slide-up">
          QR Code copiado para a área de transferência!
        </div>
      )}

      {/* <PixApproved 
        isVisible={showSuccessBar} 
        onClose={() => setShowSuccessBar(false)} 
        onAfterClose={() => setShowSuccessBar(false)} // Chama o redirecionamento
      /> */}

      <Footer />
    </div>
  );
}

PixPage.propTypes = {
  userName: PropTypes.string,
  purchaseValue: PropTypes.number,
};

export default PixPage;
