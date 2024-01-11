import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.css'
})

export class Comp1Component {
  table = [{id:'1',name:'name1',budget: 111.11,category:'category1',date:'2011-11-11'}, {id:'2',name:'name2',budget: 222.22,category:'category2',date:'2022-02-2'}];

  DownloadPDF(x: string) {
      const ele = this.table.find((element) => element.id === x);
      if (ele != null){
        const ch ="You're now viewing the project number " +ele.id +" This project is under the name " + ele.name +", has a budget of " +ele.budget +", and was initiated on " +ele.date +", its main topic is " +ele.category +".";
        const maxWidth = 180;
        const pdf = new jsPDF("p", "mm", "a4");

        const lineBrokeText = pdf.splitTextToSize(ch, maxWidth);
        
        pdf.text(lineBrokeText, 10, 10);
        pdf.save('Project_report');
      }
  }
}
