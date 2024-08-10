import { UserDocument } from "../modules/user/user.model.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument;
    isAuthenticated?: () => boolean;
  }
}
