import logoFooter from '../assets/logoFooter.svg';
import security from '../assets/security.svg';


function Footer() {
  return (
    <div >

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
