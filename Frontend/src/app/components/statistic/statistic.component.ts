import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {

}
