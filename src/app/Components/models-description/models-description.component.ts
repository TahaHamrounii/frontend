import { Component,Input,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-models-description',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './models-description.component.html',
  styleUrl: './models-description.component.css'
})
export class ModelsDescriptionComponent implements OnInit {
  @Input() desId: string = '';
  chosenModel: any = {};

  ngOnInit()
  {
    this.getModelbyId()
  }
  getModelbyId() {
    fetch(`http://127.0.0.1:8000/models/${this.desId}`)
      .then(response => response.json())
      .then(data => {
        this.chosenModel = data;
      })
  }


  editingMode = false;

  startEditing() {
    this.editingMode = true;

  }

  saveChanges() {
    this.editingMode = false;
    fetch(`http://127.0.0.1:8000/models/${this.desId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: this.chosenModel.text }),
    });
  }
    
  

  cancelEditing() {
    this.editingMode = false;
  }

}




