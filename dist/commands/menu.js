export default (client, message) => {
    client.sendText(message.from, '*📋 Menu de Comandos:*\n\n' +
        '➡️ !ajuda - Mostra instruções\n' +
        '🏓 !ping - Testa o bot\n' +
        '📋 !menu - Lista os comandos');
};
