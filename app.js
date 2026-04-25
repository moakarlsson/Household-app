import express from "express";
import session from "express-session";
import userRouter from "./routes/user.js";
import householdRouter from "./routes/household.js";
import itemsRouter from "./routes/items.js";
import recipesRouter from "./routes/recipes.js";
import mealplanRouter from "./routes/mealplan.js";

const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use("/user", userRouter); 
app.use("/items", itemsRouter);    
app.use("/recipes", recipesRouter); 
app.use("/mealplan", mealplanRouter);
app.use("/household", householdRouter);

export default app;