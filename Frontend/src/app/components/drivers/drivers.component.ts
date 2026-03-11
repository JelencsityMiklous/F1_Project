import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  number: number;
  rookie: boolean;
  teamId: number | null;
}

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule
  ],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<Driver>([]);

  columns: string[] = [
    'nr',
    'firstName',
    'lastName',
    'nationality',
    'number',
    'rookie',
    'teamId',
    'actions'
  ];

  editId: number | null = null;
  editDriver: Partial<Driver> = {};

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers() {
    this.api.selectAll('drivers').subscribe(res => {
      this.dataSource.data = res as Driver[];
    });
  }

  startEdit(driver: Driver) {
    this.editId = driver.id;
    this.editDriver = { ...driver };
  }

  cancelEdit() {
    this.editId = null;
    this.editDriver = {};
  }

  update() {
    if (this.editId === null) return;

    this.api.update('drivers', this.editId, this.editDriver).subscribe({
      next: () => {
        this.editId = null;
        this.getDrivers();
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Hiba történt a mentés során!');
      }
    });
  }

  delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt a pilótát?')) {
      return;
    }

    this.api.delete('drivers', id).subscribe({
      next: () => this.getDrivers(),
      error: (err) => {
        console.error('Delete failed', err);
        alert('Hiba történt a törlés során! (Lehet, hogy van hozzá tartozó adat?)');
      }
    });
  }
}