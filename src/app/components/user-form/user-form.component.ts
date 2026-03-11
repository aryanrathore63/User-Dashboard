import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  private formSubmitSubscription: Subscription | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.formSubmitSubscription) {
      this.formSubmitSubscription.unsubscribe();
    }
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      role: ['Viewer', [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    this.isSubmitting = true;

    const formValue = this.userForm.value;
    const newUser: Omit<User, 'id'> = {
      name: formValue.name,
      email: formValue.email,
      role: formValue.role
    };

    this.userService.addUser(newUser);

    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/']);
    }, 500);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get role() { return this.userForm.get('role'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    if (fieldName === 'email') {
      if (field.hasError('email')) {
        return 'Please enter a valid email address';
      }
      if (field.hasError('pattern')) {
        return 'Email format is invalid';
      }
    }

    if (fieldName === 'name') {
      if (field.hasError('minlength')) {
        return 'Name must be at least 2 characters';
      }
      if (field.hasError('maxlength')) {
        return 'Name must not exceed 50 characters';
      }
    }

    return '';
  }
}