import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // we should put users account but we don't have auth but we can use ip
    const {success} = await rateLimit.limit(req.ip);
    // const {success} = await rateLimit.limit("ratelimit");
    try {
        if(!success) 
            return res.status(429).json({error: "Rate Limit Exceeded"});
        next();
    } catch (error) {
        console.error("Error in Rate Limiter Middleware", error);
        next(error);
    }
}

export default rateLimiter