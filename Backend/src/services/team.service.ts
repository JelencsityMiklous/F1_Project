import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Driver } from "../entities/driver.entity";
import { Team } from "../entities/team.entity";
import { Circuit } from "../entities/circuit.entity";

export class TeamService{
    constructor(
        private driverRepo: Repository<Driver> = AppDataSource.getRepository("Driver"),
        private teamRepo: Repository<Team> = AppDataSource.getRepository("Team"),
        private circuitRepo: Repository<Circuit> = AppDataSource.getRepository("Circuit"),
    ) {}

    async createTeam(name:string, base:string, principal:string, powerUnit:string, color:string) {
        const team = this.teamRepo.create({ name, base, principal, powerUnit, color });
        return this.teamRepo.save(team);
    }

    async listTeams() {
        return this.teamRepo.find();
    }

    async getTeamById(id: number) {
        return this.teamRepo.findOneBy({ id });
    }

    async updateTeam(id: number, updateData: Partial<Team>) {
        await this.teamRepo.update(id, updateData);
        return this.teamRepo.findOneBy({ id });
    }

    async deleteTeam(id: number) {
        const team = await this.teamRepo.findOneBy({ id });
        if (!team) throw new Error("Team not found");

        await this.teamRepo.delete(team);
        return team;
    }
}