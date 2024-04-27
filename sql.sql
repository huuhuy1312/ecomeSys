DROP SCHEMA IF EXISTS `e-commerce`;
CREATE SCHEMA `e-commerce`;
USE `e-commerce`;


CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    `password` VARCHAR(120) NOT NULL,
    UNIQUE KEY username (username),
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);
CREATE TABLE user_roles (
    user_id BIGINT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE customer (
    id BIGINT PRIMARY KEY,
    num_of_bought_orders INT,
    FOREIGN KEY (id) REFERENCES users(id),
    CONSTRAINT fk_customer_user FOREIGN KEY (id) REFERENCES users(id),
    UNIQUE KEY (id)
);
CREATE TABLE seller (
    id BIGINT PRIMARY KEY,
    shop_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id),
    UNIQUE KEY (id)
);

CREATE TABLE cart (
    customer_id  BIGINT PRIMARY KEY,
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE address (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    houseNum VARCHAR(255),
    street VARCHAR(255),
    district VARCHAR(255),
    province VARCHAR(255),
    customer_id BIGINT,
    seller_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (seller_id) REFERENCES seller(id)
);
CREATE TABLE supplier (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);
CREATE TABLE shipment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    price_per_km BIGINT,
    name VARCHAR(255),
    max_kg INT,
    UNIQUE KEY (id)
);


CREATE TABLE `orders` (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    total_price BIGINT,
    status VARCHAR(255),
    date_create DATETIME,
    customer_id BIGINT,
    shipment_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (shipment_id) REFERENCES shipment(id)
);

CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description longtext,
    rate_star DOUBLE,
    quantity BIGINT,
    revenue BIGINT,
    sold_quantity INT,
    price_min BIGINT,
    price_max BIGINT,
    seller_id BIGINT,
    title1 varchar(255),
    title2 varchar(255),
    CONSTRAINT fk_seller_product FOREIGN KEY (seller_id) REFERENCES seller(id),
    category_id BIGINT,
    CONSTRAINT fk_category_product FOREIGN KEY (category_id) REFERENCES category(id),
    supplier_id BIGINT,
    CONSTRAINT fk_supplier_product FOREIGN KEY (supplier_id) REFERENCES supplier(id)
);
create table images_product(
	id bigint primary key auto_increment,
    image longtext,
    product_id bigint
);
ALTER TABLE images_product
ADD CONSTRAINT fk_images_product_product_id
FOREIGN KEY (product_id) 
REFERENCES product(id)
ON DELETE CASCADE;


CREATE TABLE types_of_product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    label1 VARCHAR(255),
    label2 VARCHAR(255),
    quantity INT,
    price BIGINT,
    cost BIGINT,
    product_id BIGINT
    
);
ALTER TABLE types_of_product
ADD CONSTRAINT fk_types_of_product_product_id
FOREIGN KEY (product_id) 
REFERENCES product(id)
ON DELETE CASCADE;
CREATE TABLE item_in_cart (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    top_id BIGINT,
    cart_id BIGINT,
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES cart(customer_id)
);
ALTER TABLE item_in_cart
ADD CONSTRAINT fk_item_types_of_product_id
FOREIGN KEY (top_id) 
REFERENCES types_of_product(id)
ON DELETE CASCADE;
create table image_classifications1(
	id BIGINT auto_increment primary key,
    classification1 varchar(255),
    image longtext,
    product_id bigint
    
);
ALTER TABLE image_classifications1
ADD CONSTRAINT fk_image_classifications1_product_id
FOREIGN KEY (product_id) 
REFERENCES product(id)
ON DELETE CASCADE;
INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_MODERATOR');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');


SELECT *
FROM `e-commerce`.item_in_cart AS iic
inner JOIN `e-commerce`.types_of_product AS top ON iic.top_id = top.id
inner join `e-commerce`.product as p on p.id = top.product_id
inner join `e-commerce`.image_classifications1 as ic on ic.product_id =p.id and ic.classification1=top.label1
WHERE iic.top_id = 7;




