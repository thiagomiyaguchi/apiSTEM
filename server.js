import express from 'express';
import cors from 'cors';

import pool, {
  createLog,
  createTemplate,
  getAll,
  getLogs,
} from './database.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/templates', async (req, res) => {
  const templates = await getAll();
  res.send(templates);
});

app.get('/log', async (req, res) => {
  const log = await getLogs();
  res.send(log);
});

app.post('/templates', async (req, res) => {
  const {
    org,
    templateId,
    namespace,
    nome,
    apelido,
    mensagem,
    variaveis,
    atendimento,
    body,
  } = req.body;
  // if (!org) {
  //   return res.status(400).json({ error: 'Confira os dados enviados' });
  // }
  const template = await createTemplate(
    org,
    templateId,
    namespace,
    nome,
    apelido,
    mensagem,
    variaveis,
    atendimento,
    body
  );
  res.status(201).send(template);
});

app.post('/log', async (req, res) => {
  const {
    dataEnvio,
    templateId,
    templateName,
    apelido,
    agente,
    telefone,
    statusEnvio,
    conversationId,
    reqBodyLog,
    fila,
    queueId,
    atendimento,
  } = req.body;
  if (!reqBodyLog) {
    return res.status(400).json({ error: 'Confira os dados enviados' });
  }
  const log = await createLog(
    dataEnvio,
    templateId,
    templateName,
    apelido,
    agente,
    telefone,
    statusEnvio,
    conversationId,
    reqBodyLog,
    fila,
    queueId,
    atendimento
  );
  res.status(201).send(log);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
