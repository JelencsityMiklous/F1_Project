import "reflect-metadata";
import  dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Circuit } from "./entities/circuit.entity";
import { Driver } from "./entities/driver.entity";
import { Race } from "./entities/race.entity";
import { Race_Result } from "./entities/race_result.entity";
import { Team } from "./entities/team.entity";

dotenv.config({ path: './src/.env' });

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DBHOST || 'localhost',
    port: parseInt(process.env.DBPORT || '3306'),   
    username: process.env.DBUSER || 'root',
    password: process.env.DBPASS || '',
    database: process.env.DBNAME || 'test',
    synchronize: true,
    logging: false,
    entities: [Circuit, Driver, Race, Race_Result, Team]
});