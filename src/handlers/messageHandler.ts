import menu from '@commands/menu'
import ajuda from '@commands/ajuda'
import ping from '@commands/ping'
import tiktok from '@commands/tiktok'
import chalk from 'chalk'

export default async (client: any, message: any) => {
    const texto = message.body.toLowerCase().trim()

    const numero = message.from.replace('@c.us', '')

    console.log(
      chalk.cyan('📩 Mensagem:'),
      chalk.yellow(`"${texto}"`),
      chalk.gray('|'),
      chalk.greenBright(`De: ${numero}`)
    )

    if (texto === '!menu') {
      menu(client, message)
    } else if (texto === '!ajuda') {
      ajuda(client, message)
    } else if (texto === '!ping') {
      ping(client, message)
    } else if (texto.includes('tiktok.com')) {
      client.sendText(message.from, '🎵 Opa! Detectei um link do TikTok! Segura aí que já tô baixando o vídeo pra você... 🎬✨')
      tiktok(client, message)
    } 
    
    // else {
    //   client.sendText(message.from, 'Digite !menu para ver os comandos.')
    // }

  if (texto === 'ping') {
    client.sendText(message.from, 'pong!')
  }
}
