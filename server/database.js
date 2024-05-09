import mysql from "mysql2";
import dotenv from "dotenv";
import winston from "winston";
dotenv.config();

const logger = winston.createLogger({
  level: "error",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    connectTimeout: 60000,
  })
  .promise();

// obtener recordatorios por id
export async function getReminderByID(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM reminders WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  } catch (error) {
    logger.error(`Error en la consulta getReminderByID: ${error.message}`);
  }
}

//obtener usuario por mail
export async function getUserByEmail(email) {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    return rows[0];
  } catch (error) {
    logger.error(`Error en la consulta getUserByMail: ${error.message}`);
  }
}
//Crear recordatorio
export async function createReminder(user_id, title) {
  try {
    const [result] = await pool.query(
      `INSERT INTO reminders (user_id, title) VALUES (?, ?)`,
      [user_id, title]
    );
    const RemainderID = result.insertId;
    return getReminderByID(RemainderID);
  } catch (error) {
    logger.error(`Error en la consulta createReminder: ${error.message}`);
  }
}

//eliminar recordatorio
export async function deleteReminder(id) {
  try {
    const [result] = await pool.query(`DELETE FROM reminders WHERE id = ?`, [
      id,
    ]);
    return result;
  } catch (error) {
    logger.error(`Error en la consulta deleteReminder: ${error.message}`);
  }
}

//Recordatorio completado
export async function reminderCompleted(value) {
  try {
    const newStatus = value === true ? "TRUE" : "FALSE";
    const [result] = await pool.query(
      `
          UPDATE reminders
          SET completed = ${newStatus}
          WHERE id = ?    
          `,
      [id]
    );
    return result;
  } catch (error) {
    logger.error(`Error en la consulta reminderCompleted: ${error.message}`);
  }
}
