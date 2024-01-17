import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsDescriptionComponent } from '../models-description/models-description.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule,ModelsDescriptionComponent,FormsModule],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})
export class ModelsComponent implements OnInit {

  modelsArray: any[] = [];
  Description: boolean = false;
  modelId: string = '';
  showInputs=false;
  constructor(private http: HttpClient) {}


  inputModelId :string ='';
  inputModelText :string ='';
  inputModelDiffusion :string ='';


  toggleAddModel(){
    this.inputModelId  ='';
    this.inputModelText  ='';
    this.inputModelDiffusion  ='';
    this.showInputs=!this.showInputs;

  }

  ngOnInit()
  {
    this.getModels()
  }
  getModels() {
    fetch('http://127.0.0.1:8000/models')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.modelsArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  showDescription(id : string)
  {
    this.modelId = id;
    this.Description = true;

  }


  saveModel() {

    this.http.post(`http://127.0.0.1:8000/models/${this.inputModelId}/${this.inputModelText}/${this.inputModelDiffusion}`, { responseType: 'text' })
      .subscribe(response => {
        console.log('Model saved successfully:', response);
      }, error => {
        console.error('Error saving model:', error);
      });
  }

}
