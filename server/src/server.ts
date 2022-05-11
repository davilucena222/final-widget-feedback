import express from "express";
import cors from "cors";
import { routes } from "./route";

const app = express();

//faz a segurança do back-end selecionando apenas quais partes do front-end podem acessar o back-end
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("HTTP server running")
});