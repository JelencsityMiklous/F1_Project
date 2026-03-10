import { Request, Response } from "express";
import { TeamService } from "../services/team.service";

export class TeamController {
    constructor(private teamService = new TeamService()) {}


    create = async (req: Request, res: Response) => {
        const { name, base, principal, powerUnit, color } = req.body;

        if (!name || !base || !principal || !powerUnit || !color) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const team = await this.teamService.createTeam(name, base, principal, powerUnit, color);
            return res.status(201).json(team);
        } catch (error) {
            console.error("Error creating team:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    list = async (_req: Request, res: Response) => {
        try {
            const teams = await this.teamService.listTeams();
            return res.json(teams);
        } catch (error) {
            console.error("Error listing teams:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    getById = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Team ID is required." });
        }
        const team = await this.teamService.getTeamById(Number(req.params.id));
        if (!team) {
            return res.status(404).json({ message: "Team not found." });
        }
        return res.json(team);
    }

    update = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Team ID is required." });
        }
        const { name, base, principal, powerUnit, color } = req.body;
        if (!name || !base || !principal || !powerUnit || !color) {
            return res.status(400).json({ message: "All fields are required." });
        }
        try {
            const updatedTeam = await this.teamService.updateTeam(Number(req.params.id), {name, base, principal, powerUnit, color});
            return res.json(updatedTeam);
        } catch (error) {
            console.error("Error updating team:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    delete = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Team ID is required." });
        }
        try {
            await this.teamService.deleteTeam(Number(req.params.id));
            return res.status(204).send();
        } catch (error) {
            console.error("Error deleting team:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

}