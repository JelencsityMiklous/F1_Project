import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
})
export class PointsComponent implements OnInit {

  drivers:any[] = [];
  constructors:any[] = [];

  driverColumns = ['pos','driver','team','points','wins','podiums'];
  constructorColumns = ['pos','team','points','wins','podiums'];

  constructor(private api:ApiService) {}

  ngOnInit(): void {

    this.api.selectAll('points/drivers')
      .subscribe((data:any)=>{
        this.drivers = data;
      });

    this.api.selectAll('points/constructors')
      .subscribe((data:any)=>{
        this.constructors = data;
      });


  }

}