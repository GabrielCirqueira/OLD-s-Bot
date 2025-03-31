import { create } from 'venom-bot'
import messageHandler from '@handlers/messageHandler'
import { startReminder } from '@scheduler/reminder'

create(
  'botzap',
  undefined,
  undefined,
  {
    headless: 'new',
    browserArgs: ['--headless=new']
  }
)
  .then((client) => {
    startReminder(client)
    client.onMessage((message) => {
      messageHandler(client, message)
    })
  })
  .catch((err) => {
    console.error('Erro ao iniciar o bot:', err)
  })
