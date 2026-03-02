# test-project-QA
Task 3: project structure

UI_TEST/
│
├── e2e/
│   ├── src/
│   │   └── tests/
│   │       ├── login.spec.ts
│   │       ├── db.spec.ts
│   │       └── other-tests.spec.ts
│   │
│   ├── pages/
│   │   ├── login.page.ts
│   │   └── webtables.page.ts
│   │
│   ├── fixtures/
│   │   └── test-data.ts
│   │
│   └── utils/
│       └── helpers.ts
│
├── playwright.config.ts
├── package.json
└── README.md


Task 4; SQL

 SELECT 
    u.username,
    SUM(oi.quantity) AS total_items_ordered
FROM Users u
JOIN Orders o ON u.user_id = o.user_id
JOIN OrderItems oi ON o.order_id = oi.order_id
JOIN Products p ON oi.product_id = p.product_id
WHERE 
    p.product_name = 'Widget'
    AND oi.quantity > 50
    AND o.order_date >= '2020-05-01'
GROUP BY u.username;

The result is zero users