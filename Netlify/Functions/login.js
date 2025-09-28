const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ⚠ Hardcode here (not secure for production)
const MONGO_URI = "mongodb+srv://admin:33SoloKilo@portfolioproject.wptjho5.mongodb.net/";
const JWT_SECRET = "yoursecretkey";

let conn = null;

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function connectDB() {
  if (conn) return conn;
  conn = await mongoose.connect(MONGO_URI);
  return conn;
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    await connectDB();
    const { email, password } = JSON.parse(event.body);

    const user = await User.findOne({ email });
    if (!user) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid email or password" }) };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid email or password" }) };
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return { statusCode: 200, body: JSON.stringify({ token }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
