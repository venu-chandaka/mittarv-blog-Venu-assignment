const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const header = req.header('Authorization');
  if(!header) return res.status(401).json({msg:'No token'});
  const token = header.split(' ')[1];
  if(!token) return res.status(401).json({msg:'No token'});
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  }catch(err){ res.status(401).json({msg:'Token invalid'}); }
}
