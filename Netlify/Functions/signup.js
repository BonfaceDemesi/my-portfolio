const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ⚠ Hardcode here (not secure in production)
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
    const { firstname, lastname, email, password } = JSON.parse(event.body);

    if (!firstname || !lastname || !email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: "All fields required" }) };
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email already registered" }) };
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, email, password: hashed });
    await user.save();

    return { statusCode: 200, body: JSON.stringify({ message: "Signup successful" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
