import { Component, OnInit } from '@angular/core';

interface Comment {
  commentId: number;
  content: string;
  date: string;
  postId: number;
  likes: number;
  dislikes: number;
  teacherName?: string; // Para opiniones asociadas a un profesor
}

@Component({  
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: false
})
export class UserProfilePage implements OnInit {

  user = {
    photo: 'assets/user-photo.jpg',
    name: 'Juan Pérez',
    role: 1 // 1 = Administrador, 0 = Miembro
  };

  // Comentarios hechos por el usuario (linkeables al post)
  comments: Comment[] = [
    { commentId: 1, content: 'Excelente post sobre Angular', date: '2025-10-26', postId: 101, likes: 5, dislikes: 1 },
    { commentId: 2, content: 'Muy útil la explicación sobre TypeScript', date: '2025-10-25', postId: 102, likes: 3, dislikes: 0 },
    { commentId: 3, content: 'No entendí la parte de los servicios en Ionic', date: '2025-10-24', postId: 103, likes: 2, dislikes: 2 },
  ];

  // Opiniones del usuario sobre profesores
  opinions: Comment[] = [
    { commentId: 4, teacherName: 'Profesor A', content: 'Muy buen docente, explica claro.', date: '2025-10-26', likes: 4, dislikes: 0, postId: 0 },
    { commentId: 5, teacherName: 'Profesor B', content: 'Necesita mejorar la organización de la materia.', date: '2025-10-25', likes: 2, dislikes: 1, postId: 0 },
    { commentId: 6, teacherName: 'Profesor C', content: 'Excelente trato y material de apoyo.', date: '2025-10-24', likes: 5, dislikes: 0, postId: 0 },
  ];

  constructor() { }

  ngOnInit() { }

  getRoleText(role: number): string {
    return role === 1 ? 'Administrador' : 'Miembro';
  }

  goToPost(postId: number) {
    console.log('Redirigir al post con ID:', postId);
    // Implementar navegación al post
  }
}
