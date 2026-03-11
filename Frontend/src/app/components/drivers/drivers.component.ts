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

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  number: number;
  rookie: boolean;
  teamId: number;
}

@Component({
  selector: 'app-drivers',
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
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  @ViewChild('driverForm') driverForm!: NgForm;

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<Driver>([]);

  columns: string[] = [
    'nr', 'firstName', 'lastName', 'nationality', 'number', 'rookie', 'teamId', 'actions'
  ];

  editId: number | null = null;
  editDriver: Partial<Driver> = {};

  newDriver: Partial<Driver> = {
    firstName: '',
    lastName: '',
    nationality: '',
    number: null as any,
    rookie: false,
    teamId: null as any
  };

  saving = false;

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers() {
    this.api.selectAll('drivers').subscribe(res => {
      this.dataSource.data = res as Driver[];
    });
  }

  addDriver() {
    if (!this.newDriver.firstName || !this.newDriver.lastName ||
        !this.newDriver.nationality || !this.newDriver.number ||
        this.newDriver.teamId === null) {
      return;
    }

    this.saving = true;

    const payload = { ...this.newDriver };
    if (payload.teamId === null) {
      delete payload.teamId;
    }

    this.api.insert('drivers', payload).subscribe({
      next: () => {
        this.saving = false;
        this.resetNewDriver();
        this.getDrivers();
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        alert('Hiba történt a pilóta hozzáadása során!');
      }
    });
  }

  resetNewDriver() {
    this.newDriver = {
      firstName: '',
      lastName: '',
      nationality: '',
      number: null as any,
      rookie: false,
      teamId: null as any
    };

    if (this.driverForm) {
      this.driverForm.resetForm();
    }
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
        console.error(err);
        alert('Hiba történt a mentés során!');
      }
    });
  }

  delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt a pilótát?')) return;

    this.api.delete('drivers', id).subscribe({
      next: () => this.getDrivers(),
      error: (err) => {
        console.error(err);
        alert('Hiba történt a törlés során! (Lehet, hogy van hozzá tartozó eredmény?)');
      }
    });
  }
}