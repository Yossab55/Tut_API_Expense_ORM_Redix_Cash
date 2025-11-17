USE tut_expenses_project;

CREATE TABLE `Users` (
  `user_id` integer AUTO_INCREMENT PRIMARY KEY ,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(70) NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `Expenses` (
  `expense_id` integer AUTO_INCREMENT PRIMARY KEY,
  `expense_category` varchar(60) NOT NULL COMMENT 'categorized by name',
  `expense_amount` decimal,
  `expense_date` datetime NOT NULL, -- YYYY-MM-DD hh:mm:ss
  `user_id` integer
);

ALTER TABLE `Expenses`
ADD CONSTRAINT `user_expenses_fk`
FOREIGN KEY (`user_id`)
REFERENCES `Users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;


-- DELIMITER $$
-- CREATE PROCEDURE find_user(IN user_param_id INT)
--   BEGIN
--     SELECT * 
--     FROM Users
--     WHERE user_id = user_param_id;
--   END $$
-- DELIMITER ;


-- DELIMITER $$
-- CREATE PROCEDURE user_today_expenses(IN user_param_id INT)
-- BEGIN
--   SELECT *
--   FROM Expenses
--   WHERE user_id = user_param_id 
--   AND
--   DATE(expense_date) = CURDATE();
-- END $$
-- DELIMITER ;
