import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: false
})
export class UserProfilePage implements OnInit {

  user: any = {};
  comments: any[] = [];
  opinions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.loadUserProfile(userId);
    } else {
      console.error('No se recibió el ID de usuario en la URL');
    }
  }


  loadUserProfile(id: number) {
    this.userService.getUserProfile(id).subscribe({
      next: (data) => {
        this.user = {
          photo: data.user.profilepicture
            ? 'data:image/jpeg;base64,' + data.user.profilepicture
            : 'assets/default-profile.png',
          name: data.user.username,
          role: data.user.role
        };
        this.comments = data.comments;
        this.opinions = data.reviews;
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
      }
    });
  }


  getRoleText(role: number): string {
    return role === 1 ? 'Administrador' : 'Miembro';
  }

  goToPost(postId: number) {
    this.router.navigate(['/community-post', postId]);
  }
}
