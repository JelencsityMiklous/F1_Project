import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

export interface RaceResult {
  id: number;
  position: number;
  points: number;
  finishTime: string;
  fastestLap: boolean;
  raceId: number;
  driverId: number;
  teamId: number;
}

@Component({
  selector: 'app-race-results',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './races-results.component.html',
  styleUrls: ['./races-results.component.scss']
})
export class RaceResultsComponent implements OnInit {

  @ViewChild('resultForm') resultForm!: NgForm;

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<RaceResult>([]);

  columns: string[] = [
    'nr',
    'position',
    'points',
    'finishTime',
    'fastestLap',
    'raceId',
    'driverId',
    'teamId',
    'actions'
  ];

  editId: number | null = null;
  editResult: Partial<RaceResult> = {};

  newResult: Partial<RaceResult> = {
    position: null as any,
    points: null as any,
    finishTime: '',
    fastestLap: false,
    raceId: null as any,
    driverId: null as any,
    teamId: null as any
  };

  saving = false;

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.api.selectAll('race-results').subscribe(res => {
      this.dataSource.data = res as RaceResult[];
    });
  }

  addResult() {
    if (!this.newResult.position ||
        !this.newResult.points ||
        !this.newResult.finishTime ||
        this.newResult.raceId == null ||
        this.newResult.driverId == null ||
        this.newResult.teamId == null) {
      return;
    }

    this.saving = true;

    const payload = { ...this.newResult };

    this.api.insert('race_results', payload).subscribe({
      next: () => {
        this.saving = false;
        this.resetNewResult();
        this.getResults();
      },
      error: (err) => {
        this.saving = false;
        console.error('Hiba az eredmény hozzáadásakor:', err);
        alert('Hiba történt az eredmény hozzáadása során!');
      }
    });
  }

  resetNewResult() {
    this.newResult = {
      position: null as any,
      points: null as any,
      finishTime: '',
      fastestLap: false,
      raceId: null as any,
      driverId: null as any,
      teamId: null as any
    };

    if (this.resultForm) {
      this.resultForm.resetForm();
    }
  }

  startEdit(result: RaceResult) {
    this.editId = result.id;
    this.editResult = { ...result };
  }

  cancelEdit() {
    this.editId = null;
    this.editResult = {};
  }

  update() {
    if (this.editId === null) return;

    this.api.update('race_results', this.editId, this.editResult).subscribe({
      next: () => {
        this.editId = null;
        this.getResults();
      },
      error: (err) => {
        console.error('Frissítési hiba:', err);
        alert('Hiba történt a mentés során!');
      }
    });
  }

  delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt az eredményt?')) return;

    this.api.delete('race_results', id).subscribe({
      next: () => this.getResults(),
      error: (err) => {
        console.error('Törlési hiba:', err);
        alert('Hiba történt a törlés során!');
      }
    });
  }
}