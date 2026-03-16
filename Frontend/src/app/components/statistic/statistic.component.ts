import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class StatisticComponent implements OnInit {

  stats = {
    teams: 0,
    drivers: 0,
    circuits: 0,
    races: 0,
    results: 0
  };

  constructor(private api: ApiService) {
}

  

  ngOnInit() {
    this.animateToValue('teams', 10);
    this.animateToValue('drivers', 21);
    this.animateToValue('circuits', 24);
    this.animateToValue('races', 24);
    this.animateToValue('results', 72);
  }

  private animateToValue(key: keyof typeof this.stats, target: number, duration = 1800) {
    const start = this.stats[key];
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeOutQuad(progress);

      this.stats[key] = Math.floor(start + (target - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.stats[key] = target;
      }
    };

    requestAnimationFrame(step);
  }

  private easeOutQuad(t: number): number {
    return t * (2 - t);
  }
}