import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.page.html',
  styleUrls: ['./teacher-page.page.scss'],
  standalone: false
})
export class TeacherPage implements OnInit {

  darkMode = false;

  constructor() {}

  ngOnInit() {
    // Initialize dark mode based on system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkMode(prefersDark);
  }

  toggleDarkMode(event: any) {
    this.setDarkMode(event.detail.checked);
  }

  private setDarkMode(isDark: boolean) {
    this.darkMode = isDark;
    document.body.classList.toggle('dark', isDark);

    // Optional: persist preference in localStorage
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }
}
