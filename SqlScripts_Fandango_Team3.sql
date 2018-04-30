-- 1. Create Table to store Billing Information 

CREATE TABLE `billing_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_card_id` int(11) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `amount` float NOT NULL,
  `tax` float NOT NULL DEFAULT '0',
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(45) NOT NULL,
  `multiplex_id` int(11) NOT NULL,
  `multiplex_name` varchar(45) NOT NULL,
  `multiplex_address` varchar(45) NOT NULL,
  `multiplex_city` varchar(45) NOT NULL,
  `multiplex_zipcode` int(11) NOT NULL,
  `adult_tickets` int(11) DEFAULT '0',
  `child_tickets` int(11) DEFAULT '0',
  `disabled_tickets` int(11) DEFAULT '0',
  `student_tickets` int(11) DEFAULT '0',
  `booking_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `show_time` varchar(45) NOT NULL,
  `show_id` varchar(45) NOT NULL,
  `screen_number` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transaction_card_id_UNIQUE` (`transaction_card_id`)
) 

-- 2. Create User Table to store user details

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `profile_image_path` varchar(200) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `disable` tinyint(4) DEFAULT '0',
  `role_number` int(11) DEFAULT NULL,
  `image_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

-- 3. Create Table to store User's card details

CREATE TABLE `user_cards_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `cardNumber` varchar(45) NOT NULL,
  `expiryMonth` int(11) NOT NULL,
  `expiryYear` int(11) NOT NULL,
  `nameOnCard` varchar(45) NOT NULL,
  `card_zipcode` int(11) NOT NULL,
  `save_card` tinyint(4) NOT NULL DEFAULT '0',
  `booking_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

-- 4. Create Admin for Fandango Website

INSERT INTO `fandango`.`user`(
	`first_name`,
	`last_name`,
	`email`,
	`password`,
	`address`,
	`city`,
	`state`,
	`zipcode`,
	`phone_number`,
	`disable`,
	`role_number`)
	VALUES
	("Fandango",
    "Admin", 
    "admin@fandango.com", 
    "$2a$10$TXNGEdU.B4YdWTBL6SEekeGr/i5iAh4bisMSNfQeOktFJ1FcbEyzm",
    "1 Washington Square", 
    "San Jose", 
    "CA", 
    "95112",
    "2132132132",
    0, 
    3
)


