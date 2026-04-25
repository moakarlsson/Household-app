USE household_app;
CREATE TABLE household (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    invite_code VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(72) NOT NULL,
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES household(id)
);

CREATE TABLE recipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    household_id INT NOT NULL,
    FOREIGN KEY (household_id) REFERENCES household(id)
);

CREATE TABLE ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    amount VARCHAR(50),
    recipe_id INT NOT NULL, 
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE meal_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    planned_date DATE NOT NULL,
    household_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (household_id) REFERENCES household(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    checked BOOLEAN DEFAULT FALSE,
    household_id INT NOT NULL,
    FOREIGN KEY (household_id) REFERENCES household(id)
);

ALTER TABLE household ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE household ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE user ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE item ADD COLUMN quantity VARCHAR(50);
ALTER TABLE item ADD COLUMN note VARCHAR(200);
