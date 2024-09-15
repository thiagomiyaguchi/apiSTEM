import express from 'express';
import cors from 'cors';

import pool, { createComentario, getComentarios } from './database.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/comentarios', async (req, res) => {
  const comentarios = await getComentarios();
  res.send(comentarios);
});

app.post('/comentarios', async (req, res) => {
  const { projeto, nome, comentario } = req.body;

  const novoComentario = await createComentario(projeto, nome, comentario);
  res.status(201).send(novoComentario);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(8081, () => {
  console.log('Server is running on port 8080');
});
