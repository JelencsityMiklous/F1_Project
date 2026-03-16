import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {MatTabsModule} from '@angular/material/tabs';
import { StatisticComponent } from './components/statistic/statistic.component';
import { TeamsComponent } from './components/teams/teams.component';
import { CircuitsComponent } from './components/circuits/circuits.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { RacesComponent } from './components/races/races.component';
import { RaceResultsComponent } from './components/races-results/races-results.component';
import { PointsComponent } from './components/points/points.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatTabsModule, StatisticComponent, TeamsComponent, CircuitsComponent, DriversComponent, RacesComponent, RaceResultsComponent, PointsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
