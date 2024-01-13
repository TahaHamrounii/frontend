import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-repbox',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './repbox.component.html',
  styleUrl: './repbox.component.css'
})
export class RepboxComponent {

  keywordsArray : any[] = []
  keyObjectsArray : any[] = []

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


}