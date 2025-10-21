import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
  standalone: false
})
export class SearchResultsPage implements OnInit {
  results: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.results = navigation?.extras?.state?.['results'] || null;

    console.log('Resultados recibidos:', this.results);
  }
}
