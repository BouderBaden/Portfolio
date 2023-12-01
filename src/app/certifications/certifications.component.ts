import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
  animations: [
    trigger('fadeImageAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
    ]),
    trigger('fadeInfoAnimation', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(20px)' }), animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [animate('500ms', style({ opacity: 0, transform: 'translateY(20px)' }))]),
    ]),
  ],
})
export class CertificationsComponent {
  certifications = [
    {
      imageUrl: 'https://rtoursel.lyceestvincent.fr/assets/certifications/CssCourse.jpg',
      date: '4 october 2023',
      title: 'CSS Web Development Crash Course',
      description: 'Learn how to style awesome websites and web applications for the internet.'
    },
    {
      imageUrl: 'https://rtoursel.lyceestvincent.fr/assets/certifications/jsPhpCourse.jpg',
      date: '22 October 2023',
      title: 'JavaScript, Bootstrap, & PHP - Certification for Beginners',
      description: 'A Comprehensive Guide for Beginners interested in learning JavaScript, Bootstrap, & PHP'
    },
    {
      imageUrl: 'https://rtoursel.lyceestvincent.fr/assets/certifications/frontEndCourse.jpg',
      date: '07 November 2023',
      title: 'The Complete Front-End Web Development Course',
      description: 'Learn HTML, CSS, JavaScript, Bootstrap and more with over 15 hours of HD video tutorials! This course was designed to be extremely beginner friendly. We will begin with the very basics of HTML and build a simple web page. By the end of this course, you will be able to develop and publish your very own Google Chrome extension! In this course we will focus on coding exercises and projects.'
    },
  ];
  currentCertificationIndex = 0;
  isFadingOut: boolean = false;
  intervalId: any;

  @ViewChild('certificationContainer', { static: false }) certificationContainer!: ElementRef;

  ngOnInit() {
    this.startInterval();
  }

  ngOnDestroy() {
    // Assurez-vous de nettoyer l'intervalle lors de la destruction du composant
    this.clearInterval();
  }

  goToCertification(index: number): void {
    this.isFadingOut = true;

    setTimeout(() => {
      this.currentCertificationIndex = index;
      this.isFadingOut = false;

      // Réinitialisez l'intervalle après le changement manuel de la diapositive
      this.resetInterval();
    }, 500);
  }

  goToNextCertification(): void {
    const nextIndex = (this.currentCertificationIndex + 1) % this.certifications.length;
    this.goToCertification(nextIndex);
  }

  startInterval() {
    this.clearInterval();
    this.intervalId = setInterval(() => {
      this.goToNextCertification();
    }, 3000);
  }

  resetInterval() {
    this.clearInterval();
    this.startInterval();
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }

  // Ajoutez ces deux méthodes pour gérer le survol de la souris
  onMouseEnter(): void {
    this.clearInterval();
  }

  onMouseLeave(): void {
    this.startInterval();
  }

}
