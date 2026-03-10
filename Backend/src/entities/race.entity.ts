import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Circuit } from "./circuit.entity";
import { Race_Result } from "./race_result.entity";

@Entity("race")

export class Race {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({type: "int"})
    round!: number;

    @Column({length: 255})
    grandPrix!: string;

    @Column({default: new Date()})
    date!: Date;

    @Column({length: 64})
    status!: string;

    @Column({length: 32})
    color!: string;

    @Column({foreignKeyConstraintName: "FK_Race_Circuit"})
    circuitId!: number;

    @ManyToOne(() => Circuit, circuit => circuit.races)
    circuit: Circuit = new Circuit();

    @OneToMany(() => Race_Result, result => result.race)
    results: Race_Result[] = [];

}


