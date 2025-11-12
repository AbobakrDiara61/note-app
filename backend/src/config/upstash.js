import { Ratelimit } from '@upstash/ratelimit' 
import { Redis } from '@upstash/redis' 
import dotenv from 'dotenv'

dotenv.config({quiet: true});
// create a ratelimiter allows 10 request per 30 seconds
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "30 s")

})

export default rateLimit
