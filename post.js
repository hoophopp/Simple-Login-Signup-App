const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const AllPosts = async (req, res) => {
    try {
        const allpost = await prisma.entry.findMany();
        return res.json(allpost); 
    } catch (err) {
        console.log("Error: ", err.message);
        return res.status(500).json({ Error: err.message });
    }
};

const postApost = async(req,res)=>{
    const { title, content } = req.body;
    const user = req.user;
    try{
        if(!title){
            return res.status(401);
        }

        const newpost = await prisma.entry.create({
            data : {
                title,
                content,
                userId: user.id
            }
        })
        res.redirect('/home');

    }catch(err){
        console.log("Error: ", err.message);
        return res.status(500).json({Error : err.message})
    }
}

module.exports = {
    AllPosts,
    postApost
}

