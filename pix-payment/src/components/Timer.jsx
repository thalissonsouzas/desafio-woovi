import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Timer = () => {
  const [seconds, setSeconds] = useState(10);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0 && !isComplete) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000); // Ajustado para 1 segundo

      return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
    } else if (seconds === 0) {
      setIsComplete(true);
    }
  }, [seconds, isComplete]);

  useEffect(() => {
    if (isComplete) {
      // Exibir a mensagem de sucesso por 2 segundos e depois redirecionar
      const timeout = setTimeout(() => {
        navigate('/cardpayment');
      }, 2000);

      return () => clearTimeout(timeout); // Limpa o timeout ao desmontar o componente
    }
  }, [isComplete, navigate]);

  return (
    <div className="flex justify-center items-center">
      {isComplete ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="p-4 w-1/4 bg-green-500 text-white rounded-lg shadow-lg">
            Pix aprovado!
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-gray-700 rounded-lg">
          <CircularProgress />
          Verificando pagamento...
        </div>
      )}
    </div>
  );
};

export default Timer;
