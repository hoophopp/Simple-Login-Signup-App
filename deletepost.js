const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deletePost = async(req,res) =>{
        const { postId } = req.body;
            const token = req.headers["authorization"];
            
            if (!token) {
            return res.status(401).json({ error: "Missing token" });
            }

        const [username, password] = token.split(":");
    try{
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const post = await prisma.entry.findUnique({where: { id: parseInt(postId) }});
     if (!post || post.userId !== user.id) {
      return res.status(403).json({ error: "You can't delete this post" });
    }

    await prisma.entry.delete({where : {id: post.id}});
    res.json({message: "deleting sucefully"})
    }catch(err){
        console.log('Error: ', err.message);
        res.status(500).json({Error: err});
    }
}

module.exports = deletePost;