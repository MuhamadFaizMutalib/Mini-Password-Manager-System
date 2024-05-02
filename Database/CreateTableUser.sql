CREATE TABLE user (
    id_user INT NOT NULL AUTO_INCREMENT, 
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id_user)
);

INSERT INTO user (username, email, password) VALUES 
    ('faiz', 'faiz.am@gmail.com', password('Faiz12345@')),
    ('man', 'man@gmail.com', password('Man123!@#')),
    ('Yunus', 'Yu@gmail.com', password('Yunus123#$')),
    ('Yunusdawda', 'Yuaa@gmail.com', password('yUnu123Ss@')),
    ('faizdawda', 'faidadaz@gmail.com', password('Faiz123#$%$'));

