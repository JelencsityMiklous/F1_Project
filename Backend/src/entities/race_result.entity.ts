import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Race } from "./race.entity";
import { Team } from "./team.entity";
import { Driver } from "./driver.entity";

@Entity("race_results")

export class Race_Result {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({type: "int"})
    position!: number;

    @Column({type: "int"})
    points!: number;

    @Column({length: 64})
    finishTime!: string;

    @Column({default: false})
    fastestLap!: boolean;

    @Column({foreignKeyConstraintName: "FK_Race_Result_Race"})
    raceId!: string;

    @Column({foreignKeyConstraintName: "FK_Race_Result_Driver"})
    driverId!: string;

    @Column({foreignKeyConstraintName: "FK_Race_Result_Team"})
    teamId!: string;

    @ManyToOne(() => Race, race => race.results)
    race: Race = new Race;

    @ManyToOne(() => Driver, driver => driver.results)
    driver: Driver = new Driver();

    @ManyToOne(() => Team, team => team.results)
    team: Team = new Team();

}


