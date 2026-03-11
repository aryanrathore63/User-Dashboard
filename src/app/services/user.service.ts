import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@gmail.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@gmail.com', role: 'Editor' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@gmail.com', role: 'Viewer' },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@gmail.com', role: 'Editor' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@gmail.com', role: 'Viewer' },
    { id: 6, name: 'Emily Davis', email: 'emily.davis@gmail.com', role: 'Admin' },
    { id: 7, name: 'Michael Wilson', email: 'michael.wilson@gmail.com', role: 'Editor' },
    { id: 8, name: 'Sarah Miller', email: 'sarah.miller@gmail.com', role: 'Viewer' },
    { id: 9, name: 'David Anderson', email: 'david.anderson@gmail.com', role: 'Admin' },
    { id: 10, name: 'Laura Taylor', email: 'laura.taylor@gmail.com', role: 'Editor' }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);
  public users$ = this.usersSubject.asObservable();

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: Omit<User, 'id'>): void {
    const newUser: User = {
      ...user,
      id: this.users.length + 1
    };
    this.users = [...this.users, newUser];
    this.usersSubject.next(this.users);
  }

  getRoleDistribution(): { [key: string]: number } {
    const distribution: { [key: string]: number } = {
      Admin: 0,
      Editor: 0,
      Viewer: 0
    };

    this.users.forEach(user => {
      if (distribution[user.role] !== undefined) {
        distribution[user.role]++;
      }
    });

    return distribution;
  }
}