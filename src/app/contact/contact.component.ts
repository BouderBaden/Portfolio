import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData: any = {};
  textContent: string = '';

  @ViewChild('contactFormTextarea') contactFormTextarea!: ElementRef;

  resizeTextarea(): void {
    const textarea = this.contactFormTextarea.nativeElement;

    textarea.style.height = 'auto';
    const newHeight = Math.max(textarea.scrollHeight, this.getMinHeight());
    textarea.style.height = newHeight + 'px';
  }

  getMinHeight(): number {
    // Choisissez la taille minimale souhaitée
    return 150;
  }

  getTextareaHeight(): string {
    return `${this.getMinHeight()}px`;
  }
}
