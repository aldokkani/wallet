CREATE DATABASE IF NOT EXISTS wallet;

USE wallet;

CREATE TABLE IF NOT EXISTS roles (
  id INT NOT NULL PRIMARY KEY,
  name char(128) UNIQUE,
  permissions JSON CHECK (JSON_VALID(permissions))
);

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL PRIMARY KEY,
  email char(128) UNIQUE,
  password LONGTEXT,
  balance DECIMAL(15,2),
  roleId INT REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT NOT NULL PRIMARY KEY,
  userId INT REFERENCES users(id),
  type ENUM('deposit', 'withdraw'),
  value DECIMAL(15,2),
  status ENUM('incomplete', 'completed', 'failed')
);

CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT NOT NULL PRIMARY KEY,
  userId INT UNIQUE REFERENCES users(id),
  expire TIMESTAMP NOT NULL
);

INSERT INTO users VALUES (1, 'john@example.com', '123456', 0, null);
