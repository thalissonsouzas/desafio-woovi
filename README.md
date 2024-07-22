# 💳 Pix Paymant

![React](https://img.shields.io/badge/React-v17.0.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v2.2.19-06B6D4)

## 📋 Sobre

# Pix Payment

**Pix Payment** é um projeto de front-end desenvolvido em **React** para facilitar pagamentos utilizando a opção de **Pix** parcelado em cartão de crédito. O usuário pode escolher entre realizar um pagamento único via Pix ou parcelar o valor, pagando a entrada pelo Pix e o restante em parcelas no cartão de crédito.

## 🚀 Funcionalidades

- **Escolha de Parcelamento**: O usuário pode escolher em quantas vezes deseja parcelar o pagamento.
- **Geração de QR Code para Pix**: A aplicação gera um QR Code para o pagamento via Pix.
- **Pagamento com Cartão de Crédito**: O usuário pode inserir os dados do cartão de crédito para pagar o saldo restante.
- **Validação em Tempo Real**: Validação de todos os campos do formulário em tempo real.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para estilização.
- **QRCode.react**: Biblioteca para geração de QR Codes.
- **React Router**: Para navegação entre páginas.
- **MUI**: Componentes de interface de usuário.

## 📄 Estrutura do Projeto

O projeto é composto pelas seguintes páginas e componentes:

### Páginas

- **Escolha de Parcelamento**: Página onde o usuário escolhe em quantas vezes deseja parcelar o pagamento.
- **QR Code para Pix**: Página que gera e exibe o QR Code para pagamento via Pix.
- **Pagamento com Cartão de Crédito**: Página onde o usuário insere os dados do cartão para pagar o saldo restante.

### Componentes

- **Footer**: Rodapé presente em todas as páginas.
- **PrazoPagamento**: Componente que exibe o prazo de pagamento.
- **Timer**: Componente que verifica o status do pagamento via Pix e redireciona para a página de pagamento com cartão após a aprovação.

## 📦 Como Rodar o Projeto

1. Clone o repositório:

    ```sh
    git clone git@github.com:thalissonsouzas/desafio-woovi.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd desafio-woovi
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

4. Inicie o servidor de desenvolvimento:

    ```sh
    npm run dev
    ```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.



