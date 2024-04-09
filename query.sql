-- Insert items for bags category into test_db.products
INSERT INTO test_db.products (id, name, price, description, category)
VALUES (1, 'Leather Bag', 99.99, 'Stylish leather bag', 'bags'),
       (2, 'Travel Backpack', 79.99, 'Durable backpack for travel', 'bags'),
       (3, 'Crossbody Purse', 49.99, 'Fashionable crossbody purse', 'bags');

-- Insert items for clothes category into test_db.products
INSERT INTO test_db.products (id, name, price, description, category)
VALUES (4, 'Denim Jeans', 59.99, 'Classic denim jeans', 'clothes'),
       (5, 'T-Shirt', 29.99, 'Comfortable cotton t-shirt', 'clothes'),
       (6, 'Hoodie', 39.99, 'Warm and cozy hoodie', 'clothes');

-- Insert items for shoes category into test_db.products
INSERT INTO test_db.products (id, name, price, description, category)
VALUES (7, 'Sneakers', 89.99, 'Casual sneakers for everyday wear', 'shoes'),
       (8, 'Boots', 109.99, 'Stylish boots for any occasion', 'shoes'),
       (9, 'Running Shoes', 79.99, 'Performance running shoes', 'shoes');

-- Inserting multiple records using a single INSERT statement
INSERT INTO test_db.users (id, username, password, fullname, email)
VALUES
    (2, 'john_doe', 'password123', 'John Doe', 'john.doe@example.com'),
    (3, 'jane_smith', 'abc123', 'Jane Smith', 'jane.smith@example.com'),
    (4, 'alice_wonderland', 'pass456', 'Alice Wonderland', 'alice@example.com');