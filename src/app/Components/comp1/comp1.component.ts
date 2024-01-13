import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepboxComponent } from '../repbox/repbox.component';


// import jsPDF from 'jspdf';

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


  ngOnInit() {
    this.getProjects()
    this.getWorkers()
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

  // DownloadPDF(x: string) {
  //     const ele = this.projectsArray.find((element) => element.id === x);
  //     if (ele != null){
  //       const ch ="You're now viewing the project number " +ele.id +" This project is under the name " + ele.name +", has a budget of " +ele.budget +", and was initiated on " +ele.date +", its main topic is " +ele.category +".";
  //       const maxWidth = 180;
  //       const pdf = new jsPDF("p", "mm", "a4");

  //       const lineBrokeText = pdf.splitTextToSize(ch, maxWidth);
        
  //       pdf.text(lineBrokeText, 10, 10);
  //       pdf.save('Generate_project'+ele.id+'_report');
  //     }
  // }
}
