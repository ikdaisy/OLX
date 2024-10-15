import Router from "express"
import * as rh from "./requestHandler.js"
import Auth from "./middleware/auth.js"
const router = Router()

router.route("/signup").post(rh.signUp)
router.route("/signin").post(rh.signIn)
//user 
router.route("/getuser/:id").get(rh.getUser)
router.route("/edituser/:_id").put(rh.editUser)
router.route("/deleteuser/:_id").delete(rh.deleteUser)
//index get all products
router.route("/getproducts/").get(Auth,rh.getProducts)
router.route("/getproductdetails/:_id").get(rh.getProductDetails)
//add product 
router.route("/addproduct").post(rh.addProduct);



export default router