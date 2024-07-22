import logoFooter from '../assets/logoFooter.svg';
import security from '../assets/security.svg';


function Footer() {
  const paymentOption = localStorage.getItem('paymentOption') || '2x';
  const totalValue = localStorage.getItem('totalValue') || 'R$ 0,00';
  const installmentValue = localStorage.getItem('installmentValue') || 'R$ 0,00';
  const taxaJuros = localStorage.getItem('interestRate') || '0,00';
  const indentificador = localStorage.getItem('identifier');
  const numberOfInstallments = parseInt(paymentOption, 10); // Número de parcelas
  const installments = Array.from({ length: numberOfInstallments }, (_, index) => index + 1);


  return (
    <div >
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
      <code className="leading-[21.82px] font-semibold text-xs text-center font-nunito text-gray-700">{indentificador}</code>

      <footer className="flex flex-col items-center mt-5 space-y-2">
        <div className="flex items-center space-x-2">
          <img src={security} alt="Segurança" />
          <p className="text-xs text-gray-500">Pagamento 100% seguro via:</p>
          <img src={logoFooter} alt="Logo Footer" />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
