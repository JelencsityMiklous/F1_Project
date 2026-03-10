import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Driver } from "../entities/driver.entity";
import { Team } from "../entities/team.entity";
import { Circuit } from "../entities/circuit.entity";

export class CircuitService {
    constructor(
        private driverRepo: Repository<Driver> = AppDataSource.getRepository("Driver"),
        private teamRepo: Repository<Team> = AppDataSource.getRepository("Team"),
        private circuitRepo: Repository<Circuit> = AppDataSource.getRepository("Circuit"),
    ) {}

    async createCircuit(name: string, country: string, city: string, lengthKm: number, lapRecord: string) {
        const circuit = this.circuitRepo.create({ name, country, city, lengthKm, lapRecord });
        return this.circuitRepo.save(circuit);
    }

    async listCircuits() {
        return this.circuitRepo.find();
    }

    async getCircuitById(id: number) {
        return this.circuitRepo.findOne({ where: { id } });
    }

    async updateCircuit(id: number, name: string, country: string, city: string, lengthKm: number, lapRecord: string) {
        return this.circuitRepo.update(id, { name, country, city, lengthKm, lapRecord });
    }

    async deleteCircuit(id: number) {
        return this.circuitRepo.delete(id);
    }
}