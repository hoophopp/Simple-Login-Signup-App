const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fakeAuth(req, res, next) {
  try {
    const token = req.headers["authorization"]; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const tokenParts = token.split(" "); 
    const rawCredentials = tokenParts[1];

    if (!rawCredentials || !rawCredentials.includes(":")) {
      return res.status(401).json({ message: "Unauthorized: Bad format" });
    }

    const [username, password] = rawCredentials.split(":");

    if (!username || !password) {
      return res.status(401).json({ message: "Unauthorized: Missing username or password" });
    }

    const user = await prisma.user.findFirst({
      where: {
        username,
        password
      }
    });

    if (!user) {
      return res.status(403).json({ message: "Forbidden: Invalid credentials" });
    }

    req.user = user; // ✅ safely attach user info
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    return res.status(500).json({ error: "Something went wrong in auth" });
  }
}

module.exports = fakeAuth;
