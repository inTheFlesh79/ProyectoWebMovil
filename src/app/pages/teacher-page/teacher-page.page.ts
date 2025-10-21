import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.page.html',
  styleUrls: ['./teacher-page.page.scss'],
  standalone: false
})
export class TeacherPage implements OnInit {

  teacher = {
    profilePicture: 'assets/default-profile.png',
    name: 'Profesor Ejemplo',
    institution: 'Universidad de Valparaíso',
    content: 'Este es un ejemplo de descripción del profesor.'
  };

  likeComment(comment: any) {
    comment.likes++;
  }

  dislikeComment(comment: any) {
    comment.dislikes++;
  }



  comments = [
  {
    id: 1,
    studentName: 'Juan Pérez',
    studentPhoto: 'assets/default-profile.png',
    date: '21/10/2025',
    content: 'Excelente profesor, explica muy claro.',
    rating: 4.2, // 👈 Agrega esto
    likes: 12,
    dislikes: 2
  },
  {
    id: 2,
    studentName: 'María López',
    studentPhoto: 'assets/default-profile.png',
    date: '20/10/2025',
    content: 'Clases muy completas, aunque a veces algo rápidas.',
    rating: 5.0, // 👈 También aquí
    likes: 8,
    dislikes: 1
  }
];


  ratings = {
    teaching: 1,   // 1 a 7
    student: 3,    // 1 a 7
    difficulty: 5  // 1 a 7
  };

  constructor() {}

  ngOnInit() {}
}
