import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";
import { Race_Result } from "./race_result.entity";

@Entity("driver")

export class Driver {

    @PrimaryGeneratedColumn("increment")
    id!: number;
    
    @Column({length: 255})
    firstName!: string;

    @Column({length: 255})
    lastName!: string;

    @Column({length: 255})
    nationality!: string;

    @Column({type: "int"})
    number!: number;

    @Column({default: false})
    rookie!: boolean;

    @ManyToOne(() => Team, team => team.drivers)
    team: Team = new Team;

    @OneToMany(() => Race_Result, result => result.driver)
    results!: Race_Result;

}   



