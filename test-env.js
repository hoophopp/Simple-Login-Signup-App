require('dotenv').config({ path: './prisma/.env' });

console.log("Your DATABASE_URL is:");
console.log(process.env.DATABASE_URL);

