import { DataSource, Repository } from 'typeorm';
import { Race_Result } from '../entities/race_result.entity';

export class PointsService {
  private raceResultRepo: Repository<Race_Result>;

  constructor(dataSource: DataSource) {
    this.raceResultRepo = dataSource.getRepository(Race_Result);
  }

  async getDriverPoints() {
    return this.raceResultRepo
      .createQueryBuilder('rr')
      .select([
        'd.id AS driverId',
        "CONCAT(d.firstName, ' ', d.lastName) AS driverName",
        't.name AS teamName',
        'SUM(rr.points) AS totalPoints',
        'COUNT(CASE WHEN rr.position = 1 THEN 1 END) AS wins',
        'COUNT(CASE WHEN rr.position <= 3 THEN 1 END) AS podiums',
      ])
      .innerJoin('rr.driver', 'd')
      .innerJoin('rr.team', 't')
      .groupBy('d.id, t.id')
      .orderBy('totalPoints', 'DESC')
      .addOrderBy('wins', 'DESC')
      .addOrderBy('podiums', 'DESC')
      .getRawMany();
  }

  async getConstructorPoints() {
    return this.raceResultRepo
      .createQueryBuilder('rr')
      .select([
        't.id AS teamId',
        't.name AS teamName',
        'SUM(rr.points) AS totalPoints',
        'COUNT(DISTINCT CASE WHEN rr.position = 1 THEN rr.raceId END) AS wins',
        'COUNT(CASE WHEN rr.position <= 3 THEN 1 END) AS podiums',
      ])
      .innerJoin('rr.team', 't')
      .groupBy('t.id')
      .orderBy('totalPoints', 'DESC')
      .addOrderBy('wins', 'DESC')
      .addOrderBy('podiums', 'DESC')
      .getRawMany();
  }
}