import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-review',
  templateUrl: './teacher-review.page.html',
  styleUrls: ['./teacher-review.page.scss'],
  standalone: false
})
export class TeacherReviewPage {
  teaching: string = '';
  studentRespect: string = '';
  difficulty: string = '';
  review: string = '';

  // flags para mostrar errores
  teachingTouched = false;
  studentRespectTouched = false;
  difficultyTouched = false;

  constructor(
    private router: Router,
    private location: Location
  ) {}

  /**
   * Solo permite dígitos del 1 al 7, máximo 1 carácter
   */
  onRatingInput(event: any, field: string) {
    const raw = (event.target as HTMLInputElement).value || '';
    let sanitized = raw.replace(/[^1-7]/g, ''); // elimina todo excepto 1-7
    sanitized = sanitized.slice(0, 1); // máximo 1 caracter

    (this as any)[field] = sanitized;
    (this as any)[`${field}Touched`] = true;
  }

  /**
   * Controla el input del textarea (máx. 500 caracteres)
   */
  onReviewInput(event: any) {
    const val = event?.detail?.value ?? event.target.value ?? '';
    this.review = val.length > 500 ? val.slice(0, 500) : val;
  }

  /**
   * Valida si el valor está entre 1 y 7
   */
  isValid(value: string): boolean {
    return /^[1-7]$/.test(value);
  }

  /**
   * Valida todo el formulario
   */
  isFormValid(): boolean {
    return (
      this.isValid(this.teaching) &&
      this.isValid(this.studentRespect) &&
      this.isValid(this.difficulty)
    );
  }

  /**
   * Acción de Publicar
   */
  onPublish() {
    this.teachingTouched = this.studentRespectTouched = this.difficultyTouched = true;

    if (!this.isFormValid()) return;

    console.log('Formulario enviado:', {
      teaching: this.teaching,
      studentRespect: this.studentRespect,
      difficulty: this.difficulty,
      review: this.review
    });

    this.router.navigate(['/teacher-page']);
  }

  /**
   * Acción de Cancelar
   */
  onCancel() {
    this.location.back();
  }
}
