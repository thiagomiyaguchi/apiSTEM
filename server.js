import express from 'express';
import cors from 'cors';

import pool, { createTemplate, getAll } from './database.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/templates', async (req, res) => {
  const templates = await getAll();
  res.send(templates);
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
  if (!org) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const note = await createTemplate(
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
  res.status(201).send(note);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
