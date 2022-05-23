// req.jwtPayload が使えるようにする。
declare namespace Express {
  export interface Request {
    jwtPayload: any;
    req: any;
  }
}
declare module "config";
