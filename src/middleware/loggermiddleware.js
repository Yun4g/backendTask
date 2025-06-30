
const loggerMiddleware = (req, res, next) => {     
    console.log(`${req.method} request made to ${req.url} at ${new Date().toISOString()}`)
    next();
}

export default loggerMiddleware;