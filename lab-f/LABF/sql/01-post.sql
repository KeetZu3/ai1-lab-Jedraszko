CREATE TABLE car
(
    id          INTEGER NOT NULL
        CONSTRAINT car_pk
            PRIMARY KEY AUTOINCREMENT,
    brand       TEXT NOT NULL,
    model       TEXT NOT NULL,
    description TEXT NOT NULL
);
