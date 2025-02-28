// services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (userData) => {
  const { name, email, password } = userData;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('El usuario ya existe');

  // Encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

exports.login = async (userData) => {
  const { email, password } = userData;

  // Verificar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) throw new Error('Usuario no encontrado');

  // Comparar contraseñas
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Credenciales incorrectas');

  // Generar JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

