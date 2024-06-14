import express, { Request, Response, urlencoded } from "express";
import { connect } from "mongoose";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import cors from "cors";
import "dotenv/config";
// imported routers
import productRouter from "./routers/product.router";
import userRouter from "./routers/user.router";
import adminRouter from "./routers/admin.router";
import billRouter from "./routers/bill.router";

const app = express();

// ? middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
const allowedOrigins: string[] = [
  "http://localhost:5173",
  "https://fullstack-ecommerce-admin-panel.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});
// ! main router
app.get("", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the Absolute shadow!");
});

// app.get("/clerk", async (req: Request, res: Response) => {
//   try {
//     const { data } = await clerk.users.getUserList();
//     res.status(200).send(data);
//   } catch (error) {
//     console.error("Clerk error:", error);
//     res.status(401).send("Unauthorized");
//   }
// });
app.get("/clerk/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // Extract the clerk ID from the request parameters
  try {
    const user = await clerk.users.getUser(id); // Fetch the user by clerk ID
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Clerk error:", error);
    res.status(401).send("Unauthorized");
  }
});

// ? routers in use
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/bills", billRouter);
/*==============================================================================================*/
// server settings
/*==============================================================================================*/

connect(process.env.URI!)
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(process.env.PORT || 3000, () => {
      console.log("==============================");
      console.log("The server is online and ready");
      console.log("==============================");
    });
  })
  .catch((err) => console.log(err));
