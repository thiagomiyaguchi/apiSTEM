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
      variaveis,
      atendimento,
      body,
    ]
  );
  const id = result.insertId;
  return getTemplate(id);
}

export default pool;
