export default (client: any, message: any) => {
  client.sendText(
    message.from,
    'ℹ️ *Ajuda do Bot*\n\n' +
    'Digite um dos comandos abaixo para interagir com o bot:\n' +
    '- !menu\n- !ajuda\n- !ping'
  )
}
