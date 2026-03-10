import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Driver } from "../entities/driver.entity";
import { Team } from "../entities/team.entity";
import { Circuit } from "../entities/circuit.entity";

export class DriverService {
    constructor(
        private driverRepo: Repository<Driver> = AppDataSource.getRepository("Driver"),
        private teamRepo: Repository<Team> = AppDataSource.getRepository("Team"),
        private circuitRepo: Repository<Circuit> = AppDataSource.getRepository("Circuit"),
    ) {}

    async createDriver(firstName: string, lastName: string, nationality: string, number: number, rookie: boolean, teamId: number) {
        const team = await this.teamRepo.findOneBy({ id: teamId });
        if (!team) throw new Error("Team not found");

        const driver = this.driverRepo.create({ firstName, lastName, nationality, number, rookie, team });
        return this.driverRepo.save(driver);
    }

    async listDrivers() {
        return this.driverRepo.find();
    }

    async getDriverById(id: number) {
        return this.driverRepo.findOneBy({ id });
    }

    async updateDriver(id: number, updateData: Partial<Driver>) {
        await this.driverRepo.update(id, updateData);
        return this.driverRepo.findOneBy({ id });
    }

    async deleteDriver(id: number) {
        const driver = await this.driverRepo.findOneBy({ id });
        if (!driver) throw new Error("Driver not found");

        await this.driverRepo.delete(driver);
        return driver;
    }

}