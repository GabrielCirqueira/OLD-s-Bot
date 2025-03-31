import cron from 'node-cron';
import axios from 'axios';
export function startReminder(client) {
    const numero = '5527996121313@c.us';
    cron.schedule('0 6 * * *', async () => {
        try {
            const response = await axios.get('https://onbibles.com/api/verses/random?bibleSlug=acf');
            const data = response.data.item;
            const versiculo = data.bible.book.chapter.verses[0].text;
            const livro = data.bible.book.name;
            const capitulo = data.chapter;
            const versiculoInicial = data.verseStart;
            const versiculoFinal = data.verseEnd;
            const sigla = 'ACF';
            const ref = versiculoInicial === versiculoFinal
                ? `${livro} ${capitulo}:${versiculoInicial}${sigla}`
                : `${livro} ${capitulo}:${versiculoInicial}-${versiculoFinal}${sigla}`;
            const mensagem = `📖 *Seu versículo de hoje:*\n\n"${versiculo}"\n\n📘 *${ref}*`;
            client.sendText(numero, '⏰ Bom diaaaaaaaa');
            await client.sendText(numero, mensagem);
        }
        catch (error) {
            console.error(error);
            client.sendText(numero, '⚠️ Não foi possível buscar o versículo hoje. Tente novamente mais tarde.');
        }
    }, {
        timezone: 'America/Sao_Paulo'
    });
}
