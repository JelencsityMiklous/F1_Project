import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Race } from "./race.entity";

@Entity("circuit")

export class Circuit {

    @PrimaryGeneratedColumn("increment")
    id!: number;
    
    @Column({length: 255})
    name!: string;

    @Column({length: 255})
    country!: string;

    @Column({length: 255})
    city!: string;

    @Column({type: "double"})
    lengthKm!: number;

    @Column({length: 64})
    lapRecord!: string;


    @OneToMany(() => Race, race => race.circuit)
    races!: Race[];
    
}   