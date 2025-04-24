// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "@/models/Order"
import Transaction from "@/models/Transaction"

export default async function  handler (req, res)  {


  try {


    const order = await Order.findOneAndUpdate(
      { _id: req.body._id },
      { status: "pending" },
      { new: true }
    );

    const amount = 20000 * order.cproduct1 + 80000 * order.cproduct2 + 96000 * order.cproduct3;
    const amount2 = Math.ceil(amount * 1.0 / 100 * 10);
    const time = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

    const newTransaction = new Transaction({ to: "seller@gmail.com", from: "ecommerce@ecommerce.com", amount: amount - amount2, time });
    const trn = await newTransaction.save();



    const order2 = await Order.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { transaction_id: trn._id } },
      { new: true }
    );



    res.status(200).json(order2);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }


}


