const jwt=require('jsonwebtoken');
function verify(req,res,next){
    const token=req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')
    try{
        const verified=jwt.verify(token,"diksha")
        req.user=verified
        next()
    }
    catch(e){
        return res.status(400).send("Invalid This Time")
    }
}

module.exports=verify;