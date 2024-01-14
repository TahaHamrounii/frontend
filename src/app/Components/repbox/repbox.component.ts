// Import necessary modules and libraries
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Handlebars from 'handlebars';

import jsPDF from 'jspdf';

// Define interfaces for Project and Worker
interface Project {
  id: string;
  name: string;
  budget: string;
  category: string;
  date: string;
}

interface Worker {
  id: string;
  name: string;
  lastName: string;
  title: string;
}

@Component({
  selector: 'app-repbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repbox.component.html',
  styleUrls: ['./repbox.component.css'],
})
export class RepboxComponent implements OnInit {
  @Input() ImportedId: string = '';

  keywordsArray: any[] = [];
  keyObjectsArray: any[] = [];
  reportText: string = '';
  convertedReportText: string = '';
  chosenProject: Project = {} as Project;
  chosenWorker: Worker = {} as Worker;

  ngOnInit() {
    this.getKeywords();
    this.getObjectsNumber();
    console.log(this.ImportedId);
  }

  getKeywords() {
    fetch('http://127.0.0.1:8000/keywords')
      .then(response => response.json())
      .then(data => {
        this.keywordsArray = data;
      })
      .catch(error => this.handleError(error));
  }

  getObjectsNumber() {
    fetch('http://127.0.0.1:8000/keywordsObjects')
      .then(response => response.json())
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
      .then(response => response.json())
      .then(data => {
        this.chosenProject = data;
        this.changeText();
        this.DownloadPDF();
      })
      .catch(error => this.handleError(error));
  }

  getWorkerbyId() {
    fetch(`http://127.0.0.1:8000/workers/${this.ImportedId}`)
      .then(response => response.json())
      .then(data => {
        this.chosenWorker = data;
        this.changeText();
        this.DownloadPDF();
      })
      .catch(error => this.handleError(error));
  }

  changeText() {
    this.convertedReportText = this.reportText;
    if (parseInt(this.ImportedId) / 10000 >= 1) {
      this.replaceWorkerKeyWords();
    } else {
      this.replaceProjectKeyWords();
    }
  }

  private handleError(error: any) {
    console.error('Error fetching data:', error);
  }


  replaceKeywords(data: any, template: string): string {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(data);
  }

  replaceWorkerKeyWords() {

    var data = {
      worker_id : this.chosenWorker.id,
      worker_name: this.chosenWorker.name,
      worker_last_name: this.chosenWorker.lastName,
      worker_title: this.chosenWorker.title,
  };
    this.convertedReportText = this.replaceKeywords(data, this.reportText);
  }

  replaceProjectKeyWords() {
    var data = {
      project_id : this.chosenProject.id,
      project_name: this.chosenProject.name,
      project_budget: this.chosenProject.budget,
      project_category: this.chosenProject.category,
      project_date: this.chosenProject.date.substring(0,10),

  };
    this.convertedReportText = this.replaceKeywords(data, this.reportText);

  }
  
  savePdf() {
    if (parseInt(this.ImportedId) / 10000 >= 1) {
      this.getWorkerbyId();
    } else {
      this.getProjectbyId();
    }
  }
  quit()
  {
    this.convertedReportText=''
    this.reportText=''
  }
  
}
