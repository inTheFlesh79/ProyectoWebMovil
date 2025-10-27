import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: false
})
export class CreatePostPage {
  title: string = '';
  content: string = '';

  readonly TITLE_MAX = 120;
  readonly CONTENT_MAX = 2000;

  constructor(private router: Router) {}

  // Lógica para habilitar el botón de publicar
  canPublish(): boolean {
    const t = this.title?.trim();
    const c = this.content?.trim();
    return !!t && !!c && t.length <= this.TITLE_MAX && c.length <= this.CONTENT_MAX;
  }

  // Botón publicar — aquí dejar el espacio para backend
  publish() {
    if (!this.canPublish()) { return; }

    // TODO: integrar con backend
    // ejemplo: this.postService.createPost({ title: this.title, content: this.content })
    //    .subscribe(...)

    // Dejar los datos listos para que backend los consuma
    const payload = {
      title: this.title.trim(),
      content: this.content.trim(),
      // ---> Agregar metadatos necesarios (userId, fecha, tags, etc.)
    };

    // Para tu compadre: se puede inyectar un PostService que envíe 'payload' a la API.
    // No implementado aquí por petición (solo placeholder).

    // Por ahora, redirigimos a community
    this.router.navigate(['/community']);
  }

  // Cancelar y limpiar lo trabajado
  cancel() {
    this.title = '';
    this.content = '';
    this.router.navigate(['/community']);
  }

  // ayuda para mostrar contador
  get titleRemaining() {
    return this.TITLE_MAX - (this.title?.length || 0);
  }

  get contentRemaining() {
    return this.CONTENT_MAX - (this.content?.length || 0);
  }
}
