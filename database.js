import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAll() {
  const [rows] = await pool.query('SELECT * FROM templates');
  return rows;
}

export async function getLogs() {
  const [rows] = await pool.query('SELECT * FROM log');
  return rows;
}

export async function getTemplate(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM templates
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

export async function getLog(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM log
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

export async function createTemplate(
  org,
  templateId,
  namespace,
  nome,
  apelido,
  mensagem,
  variaveis,
  atendimento,
  body
) {
  const variaveisToInsert =
    Array.isArray(variaveis) && variaveis.length === 0 ? null : variaveis;

  const [result] = await pool.query(
    `
  INSERT INTO templates (org,templateId,namespace,nome,apelido,mensagem,variaveis,atendimento,body)
  VALUES (?,?,?,?,?,?,?,?,?)
  `,
    [
      org,
      templateId,
      namespace,
      nome,
      apelido,
      mensagem,
      variaveisToInsert,
      atendimento,
      body,
    ]
  );
  const id = result.insertId;
  return getTemplate(id);
}

export async function createLog(
  dataEnvio,
  templateId,
  templateName,
  apelido,
  agente,
  telefone,
  statusEnvio,
  conversationId,
  reqBody,
  fila,
  queueId,
  atendimento
) {
  // const variaveisToInsert = Array.isArray(variaveis) && variaveis.length === 0 ? null : variaveis;
  const [resultLog] = await pool.query(
    `
  INSERT INTO log (dataEnvio,templateId,templateName,apelido,agente,telefone,statusEnvio,conversationId,reqBody, fila, queueId,atendimento) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
  `,
    [
      dataEnvio,
      templateId,
      templateName,
      apelido,
      agente,
      telefone,
      statusEnvio,
      conversationId,
      reqBody,
      fila,
      queueId,
      atendimento,
    ]
  );
  const id = resultLog.insertId;

  return getLog(id);
}

export default pool;
