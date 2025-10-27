import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-educational-institution',
  templateUrl: './educational-institution.page.html',
  styleUrls: ['./educational-institution.page.scss'],
  standalone:false
})
export class EducationalInstitutionPage implements OnInit {

  institution = {
    name: 'Universidad de Prueba',
    address: 'Av. Ejemplo 123, Ciudad'
  };

  professors = [
    {
      name: 'Juan Pérez',
      photo: 'assets/default-profile.png',
      description: 'Profesor de Matemáticas, especialista en álgebra.'
    },
    {
      name: 'María López',
      photo: 'assets/default-profile.png',
      description: 'Profesora de Física, experiencia en mecánica cuántica.'
    },
    {
      name: 'Carlos Sánchez',
      photo: 'assets/default-profile.png',
      description: 'Profesor de Historia, enfoque en historia contemporánea.'
    }
  ];

  constructor() { }

  ngOnInit() {}

}
