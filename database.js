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

export async function getComentarios() {
  const [rows] = await pool.query('SELECT * FROM comentarios');
  return rows;
}

export async function getComentario(id) {
  const [rows] = await pool.query(
    `
  SELECT *
  FROM comentarios
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

export async function createComentario(projeto, nome, comentario) {
  // const variaveisToInsert = Array.isArray(variaveis) && variaveis.length === 0 ? null : variaveis;
  const [resultLog] = await pool.query(
    `
  INSERT INTO comentarios (projeto,nome,comentario) VALUES (?,?,?)
  `,
    [projeto, nome, comentario]
  );
  const id = resultLog.insertId;

  return getComentario(id);
}

export default pool;
