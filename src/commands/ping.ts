export default (client: any, message: any) => {
  client.sendText(message.from, '🏓 Pong! O bot está online.')
}
