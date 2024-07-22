import Timer from './Timer';

function PrazoPagamento() {
    // Função para formatar a data e hora
    const formatDateTime = (date) => {
      // Obter dia, mês e ano
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      // Obter horas e minutos
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
  
      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };
  
    // Obter a data e hora atual
    const now = new Date();
    
    // Adicionar 10 minutos à data e hora atual
    const deadline = new Date(now.getTime() + 10 * 60 * 1000);
  
    return (
      <div className="text-center font-nunito text-softgray p-4">
        <p className="text-base">Prazo de pagamento</p>
        <h3 className="text-base text-gray-700 font-bold">{formatDateTime(deadline)}</h3>
        <Timer />
      </div>
    );
  }
  
  export default PrazoPagamento;
  