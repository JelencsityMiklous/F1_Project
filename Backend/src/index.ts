import express from "express";  
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import cors from "cors";

dotenv.config({ path: './src/.env' });
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// routes
import systemRoutes from "./routes/system.routes";
import circuitRoutes from "./routes/circuit.routes";
import raceRoutes from "./routes/race.routes"
import teamRoutes from "./routes/team.routes"
import driverRoutes from "./routes/driver.routes"
import raceResultRoutes from "./routes/race_result.routes"

app.use("/system", systemRoutes);
app.use("/circuits", circuitRoutes);
app.use("/races", raceRoutes);
app.use("/teams", teamRoutes);
app.use("/drivers", driverRoutes);
app.use("/race-results", raceResultRoutes);


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
        process.exit(1);
    }); 
