import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../pdf.service';

@Component({
  selector: 'app-repbox',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './repbox.component.html',
  styleUrls: ['./repbox.component.css'],
  providers: [PdfService]
})
export class RepboxComponent{

  @Output() CloseButton: EventEmitter<boolean> = new EventEmitter();
  @Input() ImportedId: string = '';
  quit()
  {
    this.emitEvent();
  }
  emitEvent() {
    this.CloseButton.emit(false);
  }
  constructor(private pdfService: PdfService) {}

  downloadPdf(modelId: string,id:string): void {
    this.pdfService.downloadPdf(modelId,this.ImportedId).subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'example.pdf';
      link.click();
    });
  }
}