import { Request, Response } from "express";
import { DriverService } from "../services/driver.service";

export class DriverController {

    constructor(private driverService = new DriverService()){}


    create = async (req: Request, res: Response) => {
        const {firstName,lastName,nationality,number,rookie,teamId } = req.body;
        if (!firstName || !lastName || !nationality || !number || !rookie || !teamId) {
            return res.status(400).json({ message: "All fields are required." });
        }
        try {
            const driver = await this.driverService.createDriver(firstName, lastName, nationality, number, rookie, teamId);
            return res.status(201).json(driver);
        } catch (error) {
            console.error("Error creating driver:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

        list = async (_req: Request, res: Response) => {
            const drivers = await this.driverService.listDrivers();
            return res.json(drivers);
        }

        getById = async (req: Request, res: Response) => {
            if (!req.params.id) {
                return res.status(400).json({ message: "Driver ID is required." });
            }
            const driver = await this.driverService.getDriverById(Number(req.params.id));
            if (!driver) {
                return res.status(404).json({ message: "Driver not found." });
            }
            return res.json(driver);
        }

        update = async (req: Request, res: Response) => {
            if (!req.params.id) {
                return res.status(400).json({ message: "Driver ID is required." });
            }
            const {firstName,lastName,nationality,number,rookie,teamId } = req.body;
            if (!firstName || !lastName || !nationality || !number || !rookie || !teamId) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const result = await this.driverService.updateDriver(Number(req.params.id), req.body);
            return res.status(200).json({ message: 'Driver updated successfully.' });
        }

        delete = async (req: Request, res: Response) => {
            if (!req.params.id) {
                return res.status(400).json({ message: "Driver ID is required." });
            }
            const result = await this.driverService.deleteDriver(Number(req.params.id));
            return res.status(200).json({ message: 'Driver deleted successfully.' });
        }

        getWithTeam = async (req: Request, res: Response) => {
            if (!req.params.teamId) {
                return res.status(400).json({ message: "Team ID is required." });
            }
            const drivers = await this.driverService.getDriverById(Number(req.params.teamId));
            return res.json(drivers);
        }

}
