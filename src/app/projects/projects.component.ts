import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModaleComponent } from '../modale/modale.component';

interface Project {
  name: string;
  images: string[];
  date: string;
  // Ajoutez d'autres propriétés au besoin
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      name: 'WeatherApp',
      images: [
        'https://isallak.lyceestvincent.fr/images/projet/portfolio1-652657b0dfd15297066706.jpg',
        'https://isallak.lyceestvincent.fr/images/projet/weatherapp-65265877886b2171018529.jpg',
        'https://isallak.lyceestvincent.fr/images/projet/weatherapp-65265877886b2171018529.jpg',
        // Ajoutez d'autres URLs d'images spécifiques à ce projet
      ],
      date: 'April 2023',
    },
    {
      name: 'CSE Saint-Vincent',
      images: [
        'https://isallak.lyceestvincent.fr/images/projet/cse-65265812d0cb8867230581.jpg',
        'https://isallak.lyceestvincent.fr/images/projet/weatherapp-65265877886b2171018529.jpg',
        'https://isallak.lyceestvincent.fr/images/projet/weatherapp-65265877886b2171018529.jpg',
        // Ajoutez d'autres URLs d'images spécifiques à ce projet
      ],
      date: 'May 2023',
    },
    {
      name: 'SmartLetter',
      images: [
        'https://isallak.lyceestvincent.fr/images/projet/smartletter-652663fa9cd83394891890.jpg',
        'https://isallak.lyceestvincent.fr/images/projet/weatherapp-65265877886b2171018529.jpg',
        'https://isallak.lyceestvincent.fr/images/projet/weatherapp-65265877886b2171018529.jpg',
        // Ajoutez d'autres URLs d'images spécifiques à ce projet
      ],
      date: 'June 2023',
    },
    // Ajoutez d'autres projets avec des images spécifiques
  ];

  constructor(private dialogRef: MatDialog) {}

  openModal(project: Project) {
    this.dialogRef.open(ModaleComponent, {
      data: {
        project: project,
      },
    });
  }
}
