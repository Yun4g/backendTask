
const errorHandler = (error, res, req)=>{
    console.log(error)

    res.status(500).json({
        message : "internal server error",
        error: err.message 
    })
    
      console.error(err.stack);
 
}

export default errorHandler;