# Juice Shop Login Clone 🧃

A minimal, **secure** login page inspired by [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/),
built for cybersecurity learning. It demonstrates the security
controls that Juice Shop deliberately *lacks*.

## What it does

- Renders a login form (email + password).
- **Client-side validation** — blocks empty fields, requires `@` in the email,
  and requires a password of at least 8 characters.
- **Server-side validation** — the Node/Express backend re-checks everything,
  because client-side checks can always be bypassed.
- **Secure password handling** — the demo user's password is stored as a
  **bcrypt** hash (cost factor 12), never in plain text, and verified with
  `bcrypt.compare`.
- **Injection / XSS resistant** — user lookups treat input as data (not code),
  and the browser renders server messages with `textContent`, so script
  payloads are displayed as text instead of executing.

## Project structure

```
juice-shop-login-clone/
├── public/
│   └── index.html     # the form + client-side validation
├── server.js          # Express server + server-side validation + bcrypt
├── package.json
└── README.md
```

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer (includes npm)

## How to run

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open the app in your browser
#    http://localhost:3001
```

### Demo credentials

```
Email:    superadmin@juice-shop.com
Password: SuperAdminSecret123
```
