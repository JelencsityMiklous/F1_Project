import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Driver } from "../entities/driver.entity";
import { Team } from "../entities/team.entity";
import { Circuit } from "../entities/circuit.entity";
import { Race } from "../entities/race.entity";

export class RaceService {
    constructor(
        private driverRepo: Repository<Driver> = AppDataSource.getRepository("Driver"),
        private teamRepo: Repository<Team> = AppDataSource.getRepository("Team"),
        private circuitRepo: Repository<Circuit> = AppDataSource.getRepository("Circuit"),
        private raceRepo: Repository<Race> = AppDataSource.getRepository("Race"),
    ) {}

    async createRace(round: number, grandPrix: string, date: Date, status: string, color: string, circuitId: number) {
        const circuit = await this.circuitRepo.findOneBy({ id: circuitId });
        if (!circuit) throw new Error("Circuit not found");

        const race = this.raceRepo.create({ round, grandPrix, date, status, color, circuit });
        return this.raceRepo.save(race);
    }

    async listRaces() {
        return this.raceRepo.find({ relations: ["drivers", "circuit"] });
    }

    async getRaceById(id: number) {
        return this.raceRepo.findOne({
            where: { id }
        });
    }

    async updateRace(id: number, round: number, grandPrix: string, date: Date, status: string, color: string, circuitId: number) {
        return this.raceRepo.update(id, { round, grandPrix, date, status, color, circuitId });
    }

    async deleteRace(id: number) {
        return this.raceRepo.delete(id);
    }
}