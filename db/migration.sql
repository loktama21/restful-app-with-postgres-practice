DROP TABLE IF EXISTS domestic;

CREATE TABLE domestic(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    city TEXT NOT NULL,
    pay_user BOOLEAN
);