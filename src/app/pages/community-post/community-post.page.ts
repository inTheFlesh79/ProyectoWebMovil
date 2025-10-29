import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-community-post',
  templateUrl: './community-post.page.html',
  styleUrls: ['./community-post.page.scss'],
  standalone: false
})
export class CommunityPostPage implements OnInit {
  post: any;
  comments: any[] = [];
  newComment = '';

  // Estado de voto del usuario
  userVotes: { [postId: number]: 'like' | 'dislike' | null } = {};
  voting: { [postId: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadPost(id);
  }

  loadPost(id: number) {
    console.log('Cargando post con id:', id); // 👈 para depurar
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        console.log('Post cargado:', data); // 👈 confirma si llega data
        this.post = data;
        this.loadComments(id);
      },
      error: (err) => {
        console.error('Error al cargar post:', err); // 👈 muestra error
      }
    });
  }


  loadComments(postId: number) {
    this.postService.getCommentsByPostId(postId).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error('Error al cargar comentarios:', err)
    });
  }

  onVote(post: any, voteType: 'like' | 'dislike') {
    const token = this.authService.getToken();
    if (!token) {
      alert('Debes iniciar sesión para votar.');
      return;
    }

    if (this.voting[post.postid]) return;
    this.voting[post.postid] = true;

    this.postService.vote(post.postid, voteType, token).subscribe({
      next: (res: any) => {
        console.log('Voto registrado:', res);
        this.loadPost(post.postid); // recarga likes/dislikes actualizados
        this.voting[post.postid] = false;
      },
      error: (err: any) => {
        console.error('Error al votar:', err);
        this.voting[post.postid] = false;
      }
    });
  }

  sendComment() {
    if (!this.newComment.trim()) return;
    const comment = {
      postid: this.post.postid,
      content: this.newComment
    };
    this.postService.createComment(comment).subscribe({
      next: (data) => {
        this.comments.push(data);
        this.newComment = '';
      }
    });
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') this.sendComment();
  }
}
