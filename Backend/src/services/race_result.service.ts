import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Driver } from "../entities/driver.entity";
import { Team } from "../entities/team.entity";
import { Circuit } from "../entities/circuit.entity";
import { Race_Result } from "../entities/race_result.entity";

export class Race_ResultService{
    constructor(
        private race_resultRepo: Repository<Race_Result> = AppDataSource.getRepository("Race_Result"),
        private driverRepo: Repository<Driver> = AppDataSource.getRepository("Driver"),
        private teamRepo: Repository<Team> = AppDataSource.getRepository("Team"),
        private circuitRepo: Repository<Circuit> = AppDataSource.getRepository("Circuit"),
    ) {}


    async createRace_Result(position: number, points: number, fastestLap: number, raceId: number, driverId: number, teamId: number) {
        const race = await this.race_resultRepo.findOneBy({ id: raceId });
        const driver = await this.driverRepo.findOneBy({ id: driverId });
        const team = await this.teamRepo.findOneBy({ id: teamId });

        if (!race || !driver || !team) throw new Error("Invalid race, driver or team");

        const raceResult = this.race_resultRepo.create({ race, driver, team, position, points });
        return this.race_resultRepo.save(raceResult);
    }

    async listRace_Results() {
        return this.race_resultRepo.find({ relations: ["driver", "team", "race"] });
    }

    async getRace_ResultById(id: number) {
        return this.race_resultRepo.findOne({
            where: { id },
            relations: ["driver", "team", "race"]
        });
    }

    async updateRace_Result(id: number, updateData: Partial<Race_Result>) {
        await this.race_resultRepo.update(id, updateData);
        return this.race_resultRepo.findOneBy({ id });
    }

    async deleteRace_Result(id: number) {
        const raceResult = await this.race_resultRepo.findOneBy({ id });
        if (!raceResult) throw new Error("Race result not found");

        await this.race_resultRepo.delete(raceResult);
        return raceResult;
    }

}