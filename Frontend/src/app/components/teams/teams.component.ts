import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<Team>([]);
  
  columns: string[] = [
    'nr',
    'name',
    'base',
    'principal',
    'powerUnit',
    'color',
    'actions'
  ];

  editId: number | null = null;
  editTeam: Partial<Team> = {};

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.api.selectAll('teams').subscribe(res => {
      this.dataSource.data = res as Team[];
    });
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

    this.api.update('teams', this.editId, this.editTeam).subscribe(() => {
      this.editId = null;
      this.getTeams();
    });
  }

  delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt a csapatot?')) return;
    
    this.api.delete('teams', id).subscribe(() => {
      this.getTeams();
    });
  }
}