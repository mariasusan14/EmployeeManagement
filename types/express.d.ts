import { JwtPayload } from "../dto/jwt-payloads";

declare global{
    namespace Express{
        interface Request{
            user?:JwtPayload
        }
    }
}