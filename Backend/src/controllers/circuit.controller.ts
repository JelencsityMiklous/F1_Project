import { Request, Response } from "express";
import { CircuitService } from "../services/circuit.service";

export class CircuitController {
    constructor(private circuitService = new CircuitService()) {}

    create = async (req: Request, res: Response) => {
        const {name, country, city, lengthKm, lapRecord} = req.body;
        if (!name || !country || !city || lengthKm === undefined || lapRecord === undefined) {
            return res.status(400).json({ message: "Name, country, city, lengthKm and lapRecord are required." });
        }
        const parsedLength = Number(lengthKm);
        if (Number.isNaN(parsedLength)) {
            return res.status(400).json({ message: "Length must be a number." });
        }
        try {
            const circuit = await this.circuitService.createCircuit(name, country, city, parsedLength, lapRecord);
            return res.status(201).json(circuit);
        } catch (err) {
            console.error("Error creating circuit:", err);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    list = async (_req: Request, res: Response) => {
        try {
            const circuits = await this.circuitService.listCircuits();
            return res.json(circuits);
        } catch (err) {
            console.error("Error listing circuits:", err);
            return res.status(500).json({ message: "Internal server error." });
        }
    }


    getById = async (req: Request, res: Response) => {
        if(!req.params.id) {
            return res.status(400).json({ message: "Circuit ID is required." });
        }
        const circuit = await this.circuitService.getCircuitById(Number(req.params.id));
        if (!circuit) {
            return res.status(404).json({ message: "Circuit not found." });
        }
        return res.json(circuit);
    }

    update = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ message: "Circuit ID is required." });
        }

        const { name, country, city, lengthKm, lapRecord } = req.body;
        if (!name || !country || !city || lengthKm === undefined || lapRecord === undefined) {
            return res.status(400).json({ message: "Name, country, city, lengthKm and lapRecord are required." });
        }
        const parsedLength = Number(lengthKm);
        if (Number.isNaN(parsedLength)) {
            return res.status(400).json({ message: "Length must be a number." });
        }
        try {
            const result = await this.circuitService.updateCircuit(Number(req.params.id), name, country, city, parsedLength, lapRecord);
            if ((result as any).affected === 0) {
                return res.status(404).json({ message: "Circuit not found." });
            }
            return res.status(200).json({ message: "Circuit updated successfully." });
        } catch (err) {
            console.error("Error updating circuit:", err);
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    delete = async (req: Request, res: Response) => {
        if(!req.params.id) {
            return res.status(400).json({ message: "Circuit ID is required." });
        }
        const result = await this.circuitService.deleteCircuit(Number(req.params.id));
        if ((result as any).affected === 0) {
            return res.status(404).json({ message: "Circuit not found." });
        }
        return res.status(200).json({ message: "Circuit deleted successfully." });
    }
}