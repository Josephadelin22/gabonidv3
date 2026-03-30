const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// Générer un token JWT
function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Middleware de protection
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalide" });
  }
}

// Test DB
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Connexion PostgreSQL réussie",
      server_time: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Inscription utilisateur standard
app.post("/auth/signup", async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Cet email existe déjà" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const insertedUser = await pool.query(
      `INSERT INTO users (email, password_hash, full_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, full_name`,
      [email, passwordHash, full_name]
    );

    const user = insertedUser.rows[0];

    await pool.query(
      `INSERT INTO user_roles (user_id, role)
       VALUES ($1, 'user')`,
      [user.id]
    );

    const token = createToken(user);

    return res.status(201).json({
      token,
      user,
      role: "user",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// Connexion
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT id, email, full_name, password_hash
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const dbUser = result.rows[0];
    const isValid = await bcrypt.compare(password, dbUser.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const roleResult = await pool.query(
      `SELECT role
       FROM user_roles
       WHERE user_id = $1
       ORDER BY
         CASE
           WHEN role = 'ambassador' THEN 1
           WHEN role = 'admin' THEN 2
           ELSE 3
         END
       LIMIT 1`,
      [dbUser.id]
    );

    const role = roleResult.rows[0]?.role || "user";

    const user = {
      id: dbUser.id,
      email: dbUser.email,
      full_name: dbUser.full_name,
    };

    const token = createToken(user);

    return res.json({ token, user, role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// Restaurer la session
app.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const userResult = await pool.query(
      `SELECT id, email, full_name
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    const roleResult = await pool.query(
      `SELECT role
       FROM user_roles
       WHERE user_id = $1
       ORDER BY
         CASE
           WHEN role = 'ambassador' THEN 1
           WHEN role = 'admin' THEN 2
           ELSE 3
         END
       LIMIT 1`,
      [req.user.id]
    );

    return res.json({
      user: userResult.rows[0],
      role: roleResult.rows[0]?.role || "user",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// Lire les admins + ambassadeurs
app.get("/admins", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         u.id,
         COALESCE(u.full_name, 'Sans nom') AS name,
         u.email,
         ur.role,
         true AS active
       FROM users u
       JOIN user_roles ur ON ur.user_id = u.id
       WHERE ur.role IN ('admin', 'ambassador')
       ORDER BY u.created_at DESC`
    );

    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// Créer un admin (réservé à l'ambassadeur)
app.post("/admins", authMiddleware, async (req, res) => {
  const { email, password, full_name, role } = req.body;

  try {
    const requesterRoles = await pool.query(
      `SELECT role
       FROM user_roles
       WHERE user_id = $1`,
      [req.user.id]
    );

    const roles = requesterRoles.rows.map((r) => r.role);

    if (!roles.includes("ambassador")) {
      return res.status(403).json({ error: "Accès refusé" });
    }

    const existing = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Cet email existe déjà" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await pool.query(
      `INSERT INTO users (email, password_hash, full_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, full_name`,
      [email, passwordHash, full_name]
    );

    await pool.query(
      `INSERT INTO user_roles (user_id, role, granted_by)
       VALUES ($1, $2, $3)`,
      [createdUser.rows[0].id, role || "admin", req.user.id]
    );

    return res.status(201).json({
      message: "Admin créé avec succès",
      user: createdUser.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Serveur lancé sur le port ${process.env.PORT || 5000}`);
});