import { Component, Input, OnInit } from '@angular/core';
import { Stat } from 'src/types';

@Component({
  selector: 'app-stat-chip',
  templateUrl: './stat-chip.component.html',
  styleUrls: ['./stat-chip.component.scss']
})
export class StatChipComponent implements OnInit {

  @Input()
  stat?: Stat

  constructor() { }

  ngOnInit(): void {
  }

}
