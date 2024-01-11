import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


import jsPDF from 'jspdf';

@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.css'
})

export class Comp1Component {
  table: any[] = [];
  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.getData()
  }

  getData() {
    this.http.get<any[]>('http://127.0.0.1:8000/project').subscribe(
      (response) => {
        this.table = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  DownloadPDF(x: string) {
      const ele = this.table.find((element) => element.id === x);
      if (ele != null){
        const ch ="You're now viewing the project number " +ele.id +" This project is under the name " + ele.name +", has a budget of " +ele.budget +", and was initiated on " +ele.date +", its main topic is " +ele.category +".";
        const maxWidth = 180;
        const pdf = new jsPDF("p", "mm", "a4");

        const lineBrokeText = pdf.splitTextToSize(ch, maxWidth);
        
        pdf.text(lineBrokeText, 10, 10);
        pdf.save('Generate_project'+ele.id+'_report');
      }
  }
}
