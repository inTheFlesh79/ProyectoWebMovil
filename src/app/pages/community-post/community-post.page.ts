import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

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
    private postService: PostService
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

  // 🔹 Like único
  onLike(post: any) {
    if (this.voting[post.postid]) return;
    this.voting[post.postid] = true;

    const currentVote = this.userVotes[post.postid];
    let voteType: 'like' | 'switch-like';

    if (currentVote === 'like') {
      // Ya había dado like → lo quitamos
      post.likes--;
      this.userVotes[post.postid] = null;
      this.voting[post.postid] = false;
      return;
    }

    if (currentVote === 'dislike') {
      voteType = 'switch-like';
      post.dislikes--;
      post.likes++;
    } else {
      voteType = 'like';
      post.likes++;
    }

    this.postService.votePost(post.postid, voteType).subscribe({
      next: () => {
        this.userVotes[post.postid] = 'like';
        this.voting[post.postid] = false;
      },
      error: (err) => {
        console.error('Error al votar:', err);
        this.voting[post.postid] = false;
      }
    });
  }

  // 🔹 Dislike único
  onDislike(post: any) {
    if (this.voting[post.postid]) return;
    this.voting[post.postid] = true;

    const currentVote = this.userVotes[post.postid];
    let voteType: 'dislike' | 'switch-dislike';

    if (currentVote === 'dislike') {
      // Ya había dado dislike → lo quitamos
      post.dislikes--;
      this.userVotes[post.postid] = null;
      this.voting[post.postid] = false;
      return;
    }

    if (currentVote === 'like') {
      voteType = 'switch-dislike';
      post.likes--;
      post.dislikes++;
    } else {
      voteType = 'dislike';
      post.dislikes++;
    }

    this.postService.votePost(post.postid, voteType).subscribe({
      next: () => {
        this.userVotes[post.postid] = 'dislike';
        this.voting[post.postid] = false;
      },
      error: (err) => {
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
