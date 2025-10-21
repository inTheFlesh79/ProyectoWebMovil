import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  searchQuery: string = '';

  constructor(private searchService: SearchService, private router: Router) {}

  onSearch() {
    if (!this.searchQuery.trim()) return;

    this.searchService.buscar(this.searchQuery).subscribe({
      next: (data) => {
        this.router.navigate(['/search-results'], { state: { results: data } });
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
      }
    });
  }
}
