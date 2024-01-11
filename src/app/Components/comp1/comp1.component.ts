import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.css'
})

export class Comp1Component {
  table = [{name:'ali'}, {name:'ahmed'},{name:'amin'}];
  //table = [{name:'ali'}, {name:'ahmed'}, {name:'amin'}, ];

}
