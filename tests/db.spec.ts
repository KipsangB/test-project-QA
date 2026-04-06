import { test, expect } from '@playwright/test';

test('DB Fiddle - Schema + Query Test (Fixed)', async ({ page }) => {
  await page.goto('https://www.db-fiddle.com/');

  const schemaEditor = page.locator('.CodeMirror').first();
  const queryEditor = page.locator('.CodeMirror').nth(1);

  await expect(schemaEditor).toBeVisible({ timeout: 10000 });
  await expect(queryEditor).toBeVisible({ timeout: 10000 });

  const schemaSQL = `
CREATE TABLE Clients (
    client_id INT PRIMARY KEY,
    client_name VARCHAR(100),
    address VARCHAR(255),
    phone VARCHAR(20)
);

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    registration_date DATE,
    client_id INT
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    client_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE OrderItems (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

INSERT INTO Clients VALUES
(1, 'ABC Corp', '123 Main St', '555-1234');

INSERT INTO Users VALUES
(1, 'john_doe', 'pass123', '2020-01-15', 1);

INSERT INTO Orders VALUES
(1, 1, 1, '2020-05-02', 1000.00);
INSERT INTO Products VALUES
(1, 'Widget', 10.00);
INSERT INTO OrderItems VALUES
(1, 1, 60);
`;

  await schemaEditor.evaluate((editorDiv, sql) => {
    // @ts-ignore
    editorDiv.CodeMirror.setValue(sql);
  }, schemaSQL);

  const querySQL = `
SELECT 
    u.username,
    SUM(oi.quantity) AS total_items
FROM Users u
JOIN Orders o ON u.user_id = o.user_id
JOIN OrderItems oi ON o.order_id = oi.order_id
JOIN Products p ON oi.product_id = p.product_id
WHERE 
    p.product_name = 'Widget'
    AND o.order_date >= '2020-05-01'
GROUP BY u.username
HAVING SUM(oi.quantity) > 50;
`;

  await queryEditor.evaluate((editorDiv, sql) => {
    // @ts-ignore
    editorDiv.CodeMirror.setValue(sql);
  }, querySQL);

  const runButton = page.getByRole('button', { name: 'Run' });
  await expect(runButton).toBeEnabled({ timeout: 10000 });

  await runButton.click();
  await expect(page.locator('text=john_doe')).toBeVisible({ timeout: 10000 });
});