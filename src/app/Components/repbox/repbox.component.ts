// Import necessary modules and libraries
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      this.deleteProjectKeywords();
      this.replaceWorkerKeyWords();
    } else {
      this.deleteWorkerKeywords();
      this.replaceProjectKeyWords();
    }
  }

  private handleError(error: any) {
    console.error('Error fetching data:', error);
  }

  savePdf() {
    if (parseInt(this.ImportedId) / 10000 >= 1) {
      this.getWorkerbyId();
      console.log('case1');
    } else {
      console.log('case2');
      this.getProjectbyId();
    }
  }

  replaceWorkerKeyWords() {
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_id\s*}}/g, this.chosenWorker.id);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_name\s*}}/g, this.chosenWorker.name);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_last_name\s*}}/g, this.chosenWorker.lastName);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_title\s*}}/g, this.chosenWorker.title);
  }

  replaceProjectKeyWords() {
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_id\s*}}/g, this.chosenProject.id);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_name\s*}}/g, this.chosenProject.name);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_budget\s*}}/g, this.chosenProject.budget);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_category\s*}}/g, this.chosenProject.category);
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_date\s*}}/g, this.chosenProject.date);
  }

  deleteWorkerKeywords() {
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_id\s*}}/g, '');
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_name\s*}}/g, '');
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_last_name\s*}}/g, '');
    this.convertedReportText = this.convertedReportText.replace(/{{\s*worker_title\s*}}/g, '');
  }

  deleteProjectKeywords() {
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_id\s*}}/g, '');
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_name\s*}}/g, '');
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_budget\s*}}/g, '');
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_category\s*}}/g, '');
    this.convertedReportText = this.convertedReportText.replace(/{{\s*project_date\s*}}/g, '');
  }
}
