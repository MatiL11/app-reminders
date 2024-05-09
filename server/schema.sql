CREATE DATABASE app_recordatorios;

USE app_recordatorios;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  date DATE NOT NULL,
  time TIME NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--Users de prueba
INSERT INTO users (name, email, password) VALUES ('admin', 'admin@gmail.com', 'admin');
INSERT INTO users (name, email, password) VALUES ('user', 'user@gmail.com', 'user');

--Reminders de prueba
INSERT INTO reminders (title, date, time, user_id) VALUES ('Recordar comprar pan', '2024-05-08', '10:00:00', 1);
INSERT INTO reminders (title, date, time, user_id) VALUES ('Recordar comprar leche', '2024-05-08', '11:00:00', 1);
INSERT INTO reminders (title, date, time, user_id) VALUES ('Recordar comprar huevos', '2024-05-08', '12:00:00', 1);
INSERT INTO reminders (title, date, time, user_id) VALUES ('Recordar comprar jugo', '2024-05-08', '10:00:00', 2);
INSERT INTO reminders (title, date, time, user_id) VALUES ('Recordar comprar carne', '2024-05-08', '11:00:00', 2);
INSERT INTO reminders (title, date, time, user_id) VALUES ('Recordar comprar fideos', '2024-05-08', '12:00:00', 2);
```