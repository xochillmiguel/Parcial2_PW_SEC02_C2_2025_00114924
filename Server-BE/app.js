import express from "express";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();
const PORT = 3130;

app.use(express.json());
app.use("/", accountRoutes);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
