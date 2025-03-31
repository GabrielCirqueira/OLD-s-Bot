import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default async (client, message) => {
    const link = message.body.trim();
    if (!link.includes('tiktok.com')) {
        return client.sendText(message.from, '❌ Link inválido. Envie um link do TikTok.');
    }
    try {
        const response = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(link)}`);
        const data = response.data?.data;
        console.log(data);
        const videoUrl = data?.hdplay || data?.play;
        const qualidade = data?.hdplay ? "HD" : "Normal";
        if (!videoUrl) {
            return client.sendText(message.from, '⚠️ Não foi possível obter o vídeo. Talvez o link esteja com restrições.');
        }
        const filePath = path.resolve(__dirname, 'video.mp4');
        const writer = fs.createWriteStream(filePath);
        const videoStream = await axios({
            url: videoUrl,
            method: 'GET',
            responseType: 'stream'
        });
        videoStream.data.pipe(writer);
        writer.on('finish', async () => {
            const mensagem = `📥 Vídeo baixado com sucesso! (${qualidade})`;
            await client.sendFile(message.from, filePath, 'tiktok.mp4', mensagem);
            fs.unlinkSync(filePath);
        });
    }
    catch (err) {
        console.error(err);
        client.sendText(message.from, '⚠️ Erro ao baixar o vídeo. Tente novamente.');
    }
};
