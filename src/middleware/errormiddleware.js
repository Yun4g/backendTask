
const errorHandler = (err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({
        message : "internal server error",
        error: err.message 
    })
 
}

export default errorHandler;