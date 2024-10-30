CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    email VARCHAR(100) UNIQUE
);
