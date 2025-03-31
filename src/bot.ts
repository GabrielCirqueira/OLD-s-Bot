import { create } from 'venom-bot'
import messageHandler from '@handlers/messageHandler'
import { startReminder } from '@scheduler/reminder'

create({
  session: 'botzap',
  multidevice: true,
  headless: true,
  browserArgs: ['--headless=new']
})
  .then((client) => {
    startReminder(client)
    client.onMessage((message) => {
      messageHandler(client, message)
    })
  })
  .catch((err) => {
    console.error('Erro ao iniciar o bot:', err)
  })
