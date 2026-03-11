import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';

export interface Team {
  id: number;
  name: string;
  base: string;
  principal: string;
  powerUnit: string;
  color: string;
}

@Component({
  selector: 'app-teams',
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
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  @ViewChild('teamForm') teamForm!: NgForm;

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<Team>([]);

  columns: string[] = [
    'nr', 'name', 'base', 'principal', 'powerUnit', 'color', 'actions'
  ];

  editId: number | null = null;
  editTeam: Partial<Team> = {};

  newTeam: Partial<Team> = {
    name: '',
    base: '',
    principal: '',
    powerUnit: '',
    color: ''
  };

  saving = false;

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.api.selectAll('teams').subscribe(res => {
      this.dataSource.data = res as Team[];
    });
  }

  addTeam() {
    if (!this.newTeam.name || !this.newTeam.base || !this.newTeam.principal ||
        !this.newTeam.powerUnit || !this.newTeam.color) {
      return;
    }

    this.saving = true;

    this.api.insert('teams', this.newTeam).subscribe({
      next: () => {
        this.saving = false;
        this.resetNewTeam();
        this.getTeams();
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        alert('Hiba történt a csapat hozzáadása során!');
      }
    });
  }

  resetNewTeam() {
    this.newTeam = {
      name: '',
      base: '',
      principal: '',
      powerUnit: '',
      color: ''
    };

    if (this.teamForm) {
      this.teamForm.resetForm();
    }
  }

  startEdit(team: Team) {
    this.editId = team.id;
    this.editTeam = { ...team };
  }

  cancelEdit() {
    this.editId = null;
    this.editTeam = {};
  }

  update() {
    if (this.editId === null) return;

    this.api.update('teams', this.editId, this.editTeam).subscribe({
      next: () => {
        this.editId = null;
        this.getTeams();
      },
      error: (err) => {
        console.error(err);
        alert('Hiba történt a mentés során!');
      }
    });
  }

  delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt a csapatot?')) return;

    this.api.delete('teams', id).subscribe({
      next: () => this.getTeams(),
      error: (err) => {
        console.error(err);
        alert('Hiba történt a törlés során!');
      }
    });
  }
}