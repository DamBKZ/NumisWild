
CREATE TABLE IF NOT EXISTS Role (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    label VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    hash_password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role_id INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES Role(id)
);

CREATE TABLE IF NOT EXISTS Collection (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Money (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    label VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    material VARCHAR(255),
    diameter DECIMAL(5,2),
    weight DECIMAL(5,2),
    money_condition VARCHAR(255),
    description TEXT,
    picture VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    collection_id INT NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES Collection(id),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);
INSERT INTO role (id,label) VALUES (1, 'user'), (2, 'administrator');
INSERT INTO User (id, firstname, lastname, email, hash_password, role_id) 
VALUES 
(1, 'Jean', 'Bon', 'toto@toto.fr', '$argon2id$v=19$m=19456,t=2,p=1$ryBqP3iGvpJXQbiGPXj+Ug$W/1+Hrw3lccJ1T2bGMAR6MOzF1dEqMt+a/n/FtFn7Pc', 1);

INSERT INTO Collection (label, description)
VALUES 
('Collection de Monnaies Historiques', 'Une collection regroupant des pièces rares et anciennes de différentes époques et pays.');

INSERT INTO Money (label, country, year, value, material, diameter, weight, money_condition, description, picture, collection_id, user_id)
VALUES 
('1 Franc Napoléon III', 'France', 1867, 50.00, 'Argent', 23.00, 5.00, 'Très bon état', 'Pièce rare en bon état de conservation.', '1Franc.jpg', 1, 1),
('50 Pesos Centenario', 'Mexique', 1947, 2000.00, 'Or', 37.00, 41.67, 'Excellent', 'Pièce emblématique en or massif.', '50Pesos.jpg', 1, 1),
('10 Dollars Liberty Head', 'USA', 1901, 800.00, 'Or', 27.00, 16.72, 'Bon état', 'Pièce en or avec un beau relief.', '10Dollars.jpg', 1, 1),
('2 Euros Commémoratif', 'Allemagne', 2019, 2.00, 'Cupronickel', 25.75, 8.50, 'Neuf', 'Édition limitée pour les 30 ans de la chute du mur de Berlin.', '2 eurosAllemagne.jpg', 1, 1),
('Souverain Georges V', 'Royaume-Uni', 1925, 450.00, 'Or', 22.05, 7.98, 'Très bon état', 'Pièce en or britannique recherchée.', 'souverainGeorgesV.jpg', 1, 1),
('5 Roubles Nicolas II', 'Russie', 1898, 300.00, 'Or', 18.50, 4.30, 'Bon état', 'Pièce historique de l\'Empire russe.', '5RoublesNicolasII.jpg', 1, 1),
('100 Lire République', 'Italie', 1979, 1.00, 'Acier inoxydable', 27.80, 8.00, 'Très bon état', 'Pièce courante de la lire italienne.', '100Lires.jpg', 1, 1),
('1 Peso Argentin', 'Argentine', 1992, 0.50, 'Acier inoxydable', 23.00, 7.00, 'Bon état', 'Pièce argentine avec le soleil de Mai.', '1peso.jpg', 1, 1),
('20 Francs Coq Marianne', 'France', 1912, 350.00, 'Or', 21.00, 6.45, 'Excellent', 'Pièce en or française avec Marianne.', '20francscoq.jpg', 1, 1),
('Krugerrand', 'Afrique du Sud', 2020, 1900.00, 'Or', 32.77, 33.93, 'Neuf', 'Pièce d\'investissement en or pur.', 'Krugerrand.jpg', 1, 1);

