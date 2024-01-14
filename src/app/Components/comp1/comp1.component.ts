import { Component,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepboxComponent } from '../repbox/repbox.component';



@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [CommonModule,RepboxComponent],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.css'
})

export class Comp1Component {
  projectsArray: any[] = [];
  workersArray: any[] = [];

  showTable1: boolean = false;
  showTable2: boolean = false;
  showRepbox: boolean = false;

  repbox!: RepboxComponent;

  ngOnInit() {
    this.repbox = new RepboxComponent();
    this.getProjects()
    this.getWorkers()
  }



  toggleRepbox(id : string) {
    this.showRepbox = true;
    this.repbox.setId(id);
  }
  togglePopup(ch : string): void {
    if(ch== 'table1')this.showTable1 = !this.showTable1
    else if(ch== 'table2') this.showTable2 = !this.showTable2
    
  }

  getProjects() {
    fetch('http://127.0.0.1:8000/projects')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.projectsArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  getWorkers() {
    fetch('http://127.0.0.1:8000/workers')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.workersArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  
}
