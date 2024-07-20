import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PixApproved = ({ isVisible, onClose, onAfterClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
        if (onAfterClose) {
          setTimeout(() => {
            navigate('/cardpayment');
          }, 100); // Pequeno atraso para garantir que o fechamento da mensagem seja visível
        }
      }, 3000); // Fecha a mensagem após 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, onAfterClose, navigate]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="p-4 bg-green-500 text-white rounded-lg shadow-lg">
        Pix aprovado!
      </div>
    </div>
  );
};

export default PixApproved;
