import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import jsPDF from 'jspdf';

interface Project {
  id: string;
  name: string;
  budget: string;
  category: string;
  date: string;
}

@Component({
  selector: 'app-repbox',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './repbox.component.html',
  styleUrls: ['./repbox.component.css'],
  
})
export class RepboxComponent implements OnInit {
  @Input() ImportedId: string = '';

  keywordsArray: any[] = [];
  keyObjectsArray: any[] = [];
  reportText: string = '';
  convertedReportText: string = '';
  chosenObject: Project = {} as Project;

  ngOnInit() {
    this.getKeywords();
    this.getObjectsNumber();
    console.log(this.ImportedId)
  }

  getKeywords() {
    fetch('http://127.0.0.1:8000/keywords')
    .then(response => {return response.json()})
    .then(data => {
        this.keywordsArray = data;
      })
      .catch(error => this.handleError(error));
  }

  getObjectsNumber() {
    fetch('http://127.0.0.1:8000/keywordsObjects')
    .then(response => {return response.json()})
    .then(data => {
        this.keyObjectsArray = data;
      })
      .catch(error => this.handleError(error));
  }

  DownloadPDF() {
    const maxWidth = 180;
    const pdf = new jsPDF("p", "mm", "a4");
    const lineBrokeText = pdf.splitTextToSize(this.convertedReportText, maxWidth);
    pdf.text(lineBrokeText, 10, 10);
    pdf.save('Generate_project_report');
  }


  getProjectbyId() {
    fetch(`http://127.0.0.1:8000/projects/${this.ImportedId}`)
    
    .then(response => {
      console.log('API Response:', response);
      return response.json();
    })
    .then(data => {
      this.chosenObject = data;
      this.changeText()
      this.DownloadPDF();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  changeText() {
    this.convertedReportText = this.reportText

    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_id\s*}}/g, this.chosenObject.id);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_name\s*}}/g, this.chosenObject.name);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_budget\s*}}/g, this.chosenObject.budget);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_category\s*}}/g, this.chosenObject.category);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_date\s*}}/g, this.chosenObject.date.substring(0,10));
  }



  private handleError(error: any) {
    console.error('Error fetching data:', error);
  }

  savePdf()
  {
    this.getProjectbyId()
  }
}