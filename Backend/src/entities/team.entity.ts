import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Driver } from "./driver.entity";
import { Race_Result } from "./race_result.entity";

@Entity("team")

export class Team {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({length: 255, unique: true})  
    name!: string;

    @Column({length: 255})
    base!: string;

    @Column({length: 255})
    principal!: string;

    @Column({length: 255})
    powerUnit!: string;

    @Column({length: 32})
    color!: string;

    @OneToMany(() => Driver, driver => driver.team)
    drivers: Driver[] = [];

  @OneToMany(() => Race_Result, result => result.team)
    results: Race_Result[] = [];
    
}


