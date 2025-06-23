const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signUp = async (req, res) => {
    const { username, gmail, password } = req.body;

    try {
        if (!username || !gmail || !password) {
            return res.status(400).send("All fields are required");
        }
        const newUser = await prisma.user.create({
            data: {
                username,
                gmail, 
                password,
            }
        });

        console.log(newUser);
        const token = `${username}:${password}`;
        res.redirect('/home');
        
    } catch (err) {
        console.log("Error:", err.message);
        res.status(500).send(`
            <h2>Signup Failed</h2>
            <p>${err.message}</p>
            <a href="/signup">Try Again</a>
        `);
    }
};


const login = async (req, res) => {
    const { gmail, password} = req.body;

    try{

        if(!gmail || !password) {
            return res.status(402).json({ message: "error login "});
        } 
        const userloged = await prisma.user.findFirst({
            where: {
                gmail, password
            },
             select: { username: true }
        })

        if(!userloged){
            return res.json({ message: "the user is not found "});
        }
        console.log("logged succefully");
        res.redirect('/home');

    } catch (err) {
        console.log("Error:", err.message);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

const updatuser = async(req, res) => {
    const {gmail, password} = req.body;
    const {newusernmae, newpassword} = req.body;
    try{
        const update = prisma.user.update({
            where:{
                gmail,
                password
            },
            data: {
                username: newpassword,
                password: newpassword
            }
        })

        console.log(update);

        return res.json(update);
    } catch (err) {
        console.log("Error:", err.message);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
module.exports = {
    signUp,
    login,
    updatuser
}
