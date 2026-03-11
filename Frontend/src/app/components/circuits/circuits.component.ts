import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

export interface Circuit {
  id: number;
  name: string;
  country: string;
  city: string;
  lengthKm: number;
  lapRecord: string | null;
}

@Component({
  selector: 'app-circuits',
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
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.scss']
})
export class CircuitsComponent implements OnInit {

  @ViewChild('circuitForm') circuitForm!: NgForm;

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<Circuit>([]);

  columns: string[] = ['nr', 'name', 'country', 'city', 'lengthKm', 'lapRecord', 'actions'];

  editId: number | null = null;
  editCircuit: Partial<Circuit> = {};

  newCircuit: Partial<Circuit> = {
    name: '',
    country: '',
    city: '',
    lengthKm: 0,
    lapRecord: ''
  };

  saving = false;

  ngOnInit(): void {
    this.getCircuits();
  }

  getCircuits() {
    this.api.selectAll('circuits').subscribe(res => {
      this.dataSource.data = res as Circuit[];
    });
  }

  addCircuit() {
    if (!this.newCircuit.name || !this.newCircuit.country || !this.newCircuit.city ||
        !this.newCircuit.lengthKm || !this.newCircuit.lapRecord) {
      return;
    }

    this.saving = true;

    this.api.insert('circuits', this.newCircuit).subscribe({
      next: () => {
        this.saving = false;
        this.resetNewCircuit();
        this.getCircuits();
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        alert('Hiba történt a hozzáadás során!');
      }
    });
  }

  resetNewCircuit() {
    this.newCircuit = {
      name: '',
      country: '',
      city: '',
      lengthKm: 0,
      lapRecord: ''
    };
    if (this.circuitForm) {
      this.circuitForm.resetForm();
    }
  }

  startEdit(circuit: Circuit) {
    this.editId = circuit.id;
    this.editCircuit = { ...circuit };
  }

  cancelEdit() {
    this.editId = null;
    this.editCircuit = {};
  }

  update() {
    if (this.editId === null) return;

    this.api.update('circuits', this.editId, this.editCircuit).subscribe({
      next: () => {
        this.editId = null;
        this.getCircuits();
      },
      error: (err) => {
        console.error(err);
        alert('Hiba történt a mentés során!');
      }
    });
  }

  delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt a pályát?')) return;

    this.api.delete('circuits', id).subscribe({
      next: () => this.getCircuits(),
      error: (err) => {
        console.error(err);
        alert('Hiba történt a törlés során!');
      }
    });
  }
}