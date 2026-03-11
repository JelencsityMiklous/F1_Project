import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
export interface Race {
  id: number
  round: number
  grandPrix: string
  date: Date
  status: string
  circuitId: number
}

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})

export class RacesComponent implements OnInit {

  constructor(private api: ApiService) {}

  dataSource = new MatTableDataSource<Race>([])

  columns: string[] = [
    'nr',
    'round',
    'grandPrix',
    'date',
    'status',
    'circuitId',
    'actions'
  ]

  editId: number | null = null
  editRace: any = {}

  ngOnInit(): void {
    this.getRaces()
  }

  getRaces() {
    this.api.selectAll('races').subscribe(res => {
      this.dataSource.data = res as Race[]
    })
  }

  startEdit(race: Race) {
    this.editId = race.id
    this.editRace = { ...race }
  }

  cancelEdit() {
    this.editId = null
  }

  update() {
  if (this.editId === null) return;

  this.api.update('races', this.editId, this.editRace).subscribe(() => {
    this.editId = null
    this.getRaces()
  })
}

    delete(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt a futamot?')) {
      return; 
    }

    this.api.delete('races', id).subscribe(() => {
      this.getRaces();
    });
  }

}