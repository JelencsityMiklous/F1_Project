import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

export interface Race {
  id: number;
  round: number;
  grandPrix: string;
  date: string;
  status: string;
  circuitId: number;
}

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {

  @ViewChild('raceForm') raceForm!: NgForm;

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<Race>([]);

  columns: string[] = [
    'nr', 'round', 'grandPrix', 'date', 'status', 'circuitId', 'actions'
  ];

  editId: number | null = null;
  editRace: Partial<Race> = {};

  newRace: Partial<Race> = {
    round: null as any,
    grandPrix: '',
    date: '',
    status: '',
    circuitId: null as any
  };

  saving = false;

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces() {
    this.api.selectAll('races').subscribe(res => {
      this.dataSource.data = res as Race[];
    });
  }

  addRace() {
    if (!this.newRace.round || !this.newRace.grandPrix ||
        !this.newRace.date || !this.newRace.status ||
        !this.newRace.circuitId) {
      return;
    }

    this.saving = true;

    this.api.insert('races', this.newRace).subscribe({
      next: () => {
        this.saving = false;
        this.resetNewRace();
        this.getRaces();
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        alert('Hiba történt a futam hozzáadása során!');
      }
    });
  }

  resetNewRace() {
    this.newRace = {
      round: null as any,
      grandPrix: '',
      date: '',
      status: '',
      circuitId: null as any
    };

    if (this.raceForm) {
      this.raceForm.resetForm();
    }
  }

  startEdit(race: Race) {
    this.editId = race.id;
    this.editRace = { ...race };
  }

  cancelEdit() {
    this.editId = null;
    this.editRace = {};
  }

  update() {
    if (this.editId === null) return;

    this.api.update('races', this.editId, this.editRace).subscribe({
      next: () => {
        this.editId = null;
        this.getRaces();
      },
      error: (err) => {
        console.error(err);
        alert('Hiba történt a mentés során!');
      }
    });
  }

  delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt a futamot?')) return;

    this.api.delete('races', id).subscribe({
      next: () => this.getRaces(),
      error: (err) => {
        console.error(err);
        alert('Hiba történt a törlés során!');
      }
    });
  }
}