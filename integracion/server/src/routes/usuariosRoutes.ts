import {Router} from "express";
import appController from "../controllers/usuariosController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.post("/newUser",appController.newUser);
   
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
