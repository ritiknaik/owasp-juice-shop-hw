const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const SALT_ROUNDS = 13;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

// Demo user with a bcrypt-hashed password when the server starts.
(async () => {
  const passwordHash = await bcrypt.hash('SuperAdminSecret123', SALT_ROUNDS);
  users.push({ id: 1, email: 'superadmin@juice-shop.com', passwordHash });
  console.log('Demo login -> superadmin@juice-shop.com / SuperAdminSecret123');
})();

// Server side validation
function validateCredentials(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') return 'Invalid input.';
  if (!email.trim() || !password) return 'Email and password are required.';
  if (!email.includes('@')) return 'Email must contain "@".';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  //Validate again on the server.
  const validationError = validateCredentials(email, password);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  const user = users.find((u) => u.email === email);
  const passwordOk = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !passwordOk) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  return res.json({ success: true, message: `Welcome back, ${email}!` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
