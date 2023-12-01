import { Component, ElementRef, Renderer2, OnDestroy, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Project {
  name: string;
  images: string[];
  date: string;
  // Ajoutez d'autres propriétés au besoin
}

@Component({
  selector: 'app-modale',
  templateUrl: './modale.component.html',
  styleUrls: ['./modale.component.scss']
})
export class ModaleComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private autoChangeSubscription: Subscription = new Subscription();

  currentImageIndex = 0;
  images: string[] = [];
  indicators: boolean[] = [];

  constructor(
    private dialogRef: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.images = data.project.images;
    this.updateIndicators();
  }

  ngOnInit() {
    // Démarrez l'intervalle pour changer automatiquement l'image toutes les 2 secondes
    this.autoChangeSubscription = interval(3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.applyImageFadeAnimation();
      });
  }

  ngOnDestroy() {
    // Assurez-vous de vous désabonner de l'observable pour éviter des fuites mémoire
    this.destroy$.next();
    this.destroy$.complete();

    // Désabonnez-vous également du changement automatique d'image
    if (this.autoChangeSubscription) {
      this.autoChangeSubscription.unsubscribe();
    }
  }

  applyImageFadeAnimation() {
    const imageElement = this.el.nativeElement.querySelector('.contenant-image img');
    this.renderer.addClass(imageElement, 'image-fade-out');

    // Utilisez une promesse pour détecter la fin de l'animation
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    // Dès que l'animation est terminée, changez l'image
    promise.then(() => {
      this.renderer.removeClass(imageElement, 'image-fade-out');

      // Changez l'image ici (après la fin de l'animation)
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.updateIndicators();
    });
  }

  nextImage() {
    // Réinitialisez le compte à rebours lors d'un changement manuel d'image
    if (this.autoChangeSubscription) {
      this.autoChangeSubscription.unsubscribe();
      this.autoChangeSubscription = interval(2000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.applyImageFadeAnimation();
        });
    }

    this.applyImageFadeAnimation();
  }

  prevImage() {
    // Réinitialisez le compte à rebours lors d'un changement manuel d'image
    if (this.autoChangeSubscription) {
      this.autoChangeSubscription.unsubscribe();
      this.autoChangeSubscription = interval(2000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.applyImageFadeAnimation();
        });
    }

    this.applyImageFadeAnimation();
  }

  updateIndicators() {
    this.indicators = Array(this.images.length).fill(false);
    this.indicators[this.currentImageIndex] = true;
  }

  goToImage(index: number) {
    // Réinitialisez le compte à rebours lors d'un changement manuel d'image
    if (this.autoChangeSubscription) {
      this.autoChangeSubscription.unsubscribe();
      this.autoChangeSubscription = interval(2000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.applyImageFadeAnimation();
        });
    }

    this.applyImageFadeAnimation(); // Appliquez l'animation de fondu lorsqu'on clique sur un indicateur

    // Changez l'image après l'animation de fondu (comme dans applyImageFadeAnimation)
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.currentImageIndex = index;
        this.updateIndicators();
        resolve();
      }, 500);
    });
  }

  closeDialog(): void {
    this.dialogRef.closeAll();
  }
}
