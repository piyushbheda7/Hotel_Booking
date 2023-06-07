import { instance } from "../server.js"
import crypto from "crypto";

export const checkout = async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,  // amount in the smallest currency unit
            // amount: 1 * 100,
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        // console.log(options.amount)
        const order = await instance.orders.create(options)
        // console.log(order);
        res.status(200).json({
            success: true,
            order,
        })
    } catch (error) {
        res.status(404).json({
            success: false,

        })
    }
}

export const paymentverification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const id = await req.params.id
    const amount = await req.params.amount

    const expectedSignature = crypto.createHmac('sha256', 'BVMsMQrVjNPny7P1Oj0DK41G')
        .update(body.toString())
        .digest('hex');
    //   console.log("sig received " ,razorpay_signature);
    //   console.log("sig generated " ,expectedSignature);

    const isauth = expectedSignature === razorpay_signature
    if (isauth) {
        //database me paymentid,orderid,signatureid import karni he
        res.status(200).json({
            success: true,

        })
    } else {
        try {
            res.redirect(`http://localhost:3000/paymentsuccess?id=${id}&amount=${amount}&reference_no=${razorpay_payment_id}`)
            res.status(200).json({
                success: true,
            })
        }
        catch (error) { }
    }



}