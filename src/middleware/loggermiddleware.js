
const loggerMiddleware = (req, res, next) => {     
    return res.send(`${req.method} request made to ${req.url} at ${new Date().toISOString()}`);
    console.log(`${req.method} request made to ${req.url} at ${new Date().toISOString()}`)
    next();
}

export default loggerMiddleware;