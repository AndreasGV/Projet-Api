const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../validations/authValidation");

exports.signup = async (req, res) => {
  try {
    // VALID AVEC ZOD
    const parsedData = signupSchema.parse(req.body);

    // VERIF SI USER EXISTE
    const existingUser = await User.findOne({ email: parsedData.email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // MDP HACHER
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    // CREAT USER
    const newUser = new User({
      email: parsedData.email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Données invalides", errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const parsedData = loginSchema.parse(req.body);

    // RECHERCHE USER
    const user = await User.findOne({ email: parsedData.email });
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    // VERIF MDP
    const match = await bcrypt.compare(parsedData.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    // TOKEN
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Données invalides", errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
