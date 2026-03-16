import { Request, Response } from "express";
import { RaceService } from "../services/race.service";

export class RaceController {
    constructor(private raceService = new RaceService()) {}

    create = async (req: Request, res: Response) => {
        const { round, grandPrix, date, status, color, circuitId } = req.body;

        if (!round || !grandPrix || !date || !status || !color || !circuitId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const race = await this.raceService.createRace(round, grandPrix, date, status, circuitId);
            return res.status(201).json(race);
        } catch (error) {
            console.error("Error creating race:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    list = async (_req: Request, res: Response) => {
        try {
            const races = await this.raceService.listRaces();
            return res.json(races);
        } catch (error) {
            console.error("Error listing races:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    getById = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Race ID is required." });
        }
        const race = await this.raceService.getRaceById(Number(req.params.id));
        if (!race) {
            return res.status(404).json({ message: "Race not found." });
        }
        return res.json(race);
    }

    update = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Race ID is required." });
        }
        const { round, grandPrix, date, status, color, circuitId } = req.body;
        if (!round || !grandPrix || !date || !status || !color || !circuitId) {
            return res.status(400).json({ message: "All fields are required." });
        }
        try {
            const updatedRace = await this.raceService.updateRace(Number(req.params.id), round, grandPrix, date, status, color, circuitId);
            return res.json(updatedRace);
        } catch (error) {
            console.error("Error updating race:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    delete = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Race ID is required." });
        }
        try {
            await this.raceService.deleteRace(Number(req.params.id));
            return res.status(204).send();
        } catch (error) {
            console.error("Error deleting race:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

}