import express from "express"
import {checkout} from "../controllers/payment.js"
import {paymentverification} from "../controllers/payment.js"

const router=express.Router()

router.post("/checkout",checkout)
router.post("/paymentverification/:id/:amount",paymentverification)

export default router;