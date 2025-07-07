import express from "express";

import { logger } from "./utils/logger";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
