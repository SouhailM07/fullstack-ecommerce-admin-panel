import { Request, Router, Response } from "express";
import Bill from "../models/bill.model";

const router = Router();

router.get("", async (req: Request, res: Response) => {
  const bills = await Bill.find({});
  return res.status(200).send(bills);
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    let { userId, shoppingListDataExact } = await req.body;
    let newBill = new Bill({ userId, shoppingListDataExact });
    await newBill.save();
    res.status(201).send("new bill was added");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let deleteBill = await Bill.findOneAndDelete({ userId: id });
    if (!deleteBill) {
      return res.status(404).send("bill was not found");
    }
    return res.status(201).send("bill was deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
