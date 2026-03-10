import { Request, Response } from "express";
import { Race_ResultService } from "../services/race_result.service";

export class Race_ResultController {
    constructor(private raceResultService = new Race_ResultService()) {}

    create = async (req: Request, res: Response) => {
        const { position, points, fastestLap, raceId, driverId, teamId } = req.body;

        if (!position || !points || !fastestLap || !raceId || !driverId || !teamId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const raceResult = await this.raceResultService.createRace_Result(position, points, fastestLap, raceId, driverId, teamId);
            return res.status(201).json(raceResult);
        } catch (error) {
            console.error("Error creating race result:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    list = async (_req: Request, res: Response) => {
        try {
            const raceResults = await this.raceResultService.listRace_Results();
            return res.json(raceResults);
        } catch (error) {
            console.error("Error listing race results:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    getById = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Race Result ID is required." });
        }
        const raceResult = await this.raceResultService.getRace_ResultById(Number(req.params.id));
        if (!raceResult) {
            return res.status(404).json({ message: "Race Result not found." });
        }
        return res.json(raceResult);
    }

    update = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Race Result ID is required." });
        }
        const { position, points, fastestLap, raceId, driverId, teamId } = req.body;
        if (!position || !points || !fastestLap || !raceId || !driverId || !teamId) {
            return res.status(400).json({ message: "All fields are required." });
        }
        try {
            const updatedRaceResult = await this.raceResultService.updateRace_Result(Number(req.params.id), { position, points, fastestLap, raceId, driverId, teamId });
            return res.json(updatedRaceResult);
        } catch (error) {
            console.error("Error updating race result:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    delete = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Race Result ID is required." });
        }
        try {
            await this.raceResultService.deleteRace_Result(Number(req.params.id));
            return res.status(204).send();
        } catch (error) {
            console.error("Error deleting race result:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

}