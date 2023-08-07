import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";

const swaggerYAML = YAML.load("./src/routes/swagger.yaml")

export const swaggerRouter = Router ()

swaggerRouter.use("/api-docs", swaggerUi.serve);
swaggerRouter.get("/api-docs", swaggerUi.setup(swaggerYAML));