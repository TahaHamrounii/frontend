import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import jsPDF from 'jspdf';

@Component({
  selector: 'app-repbox',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './repbox.component.html',
  styleUrl: './repbox.component.css'
})
export class RepboxComponent {

  keywordsArray : any[] = []
  keyObjectsArray : any[] = []
  reportText: string = ''

  ngOnInit() {
    this.getKeywords()
    this.getObjectsNumber()
  }
  getKeywords() {
    fetch('http://127.0.0.1:8000/keywords')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.keywordsArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  getObjectsNumber() {
    fetch('http://127.0.0.1:8000/keywordsObjects' )
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.keyObjectsArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  DownloadPDF() {
        const maxWidth = 180;
        const pdf = new jsPDF("p", "mm", "a4");
        console.log(this.reportText);
        const lineBrokeText = pdf.splitTextToSize(this.reportText, maxWidth);
        pdf.text(lineBrokeText, 10, 10);
        pdf.save('Generate_project_report');
      }
}


