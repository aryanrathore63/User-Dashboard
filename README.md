# User Dashboard

An Angular application that displays a user dashboard with a dynamic table and Chart.js pie chart showing user role distribution. The application features lazy loading for the user form modal and Chart.js library, and uses RxJS for state management.

## Features

- **User Dashboard**: Displays a table of users with Name, Email, and Role columns
- **Dynamic Chart**: Chart.js pie chart showing the distribution of user roles (Admin, Editor, Viewer)
- **Lazy Loading**: 
  - UserFormComponent is lazy-loaded only when the "Add User" button is clicked
  - Chart.js library is loaded dynamically when the component initializes
- **Real-time Updates**: Table and chart update automatically when a new user is added
- **Form Validation**: User form includes validation for name, email, and role fields
- **RxJS State Management**: Uses BehaviorSubject for managing user state

## Technologies

- Angular 14+
- Chart.js 4.4.0
- RxJS 7.8.0
- TypeScript 4.8.4
- SCSS for styling

## Design Theme

- Primary Color: `#1c4980`
- Secondary Color: `#383838`
- Button/Input Height: `48px`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── user-dashboard/
│   │   │   ├── user-dashboard.component.ts
│   │   │   ├── user-dashboard.component.html
│   │   │   └── user-dashboard.component.scss
│   │   └── user-form/
│   │       ├── user-form.module.ts
│   │       ├── user-form.component.ts
│   │       ├── user-form.component.html
│   │       └── user-form.component.scss
│   ├── services/
│   │   └── user.service.ts
│   ├── app.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.scss
├── assets/
├── index.html
├── main.ts
├── polyfills.ts
├── styles.scss
└── test.ts
```

## Usage

1. **View Users**: The dashboard displays all users in a table format
2. **View Role Distribution**: The pie chart shows the distribution of user roles
3. **Add User**: Click the "Add User" button to open the lazy-loaded modal form
4. **Fill Form**: Enter the user's name, email, and select a role
5. **Submit**: Click "Save User" to add the user and see real-time updates

## Component Details

### UserDashboardComponent
- Displays the user table and Chart.js pie chart
- Manages the modal visibility
- Subscribes to user updates via RxJS
- Lazy loads Chart.js library

### UserFormComponent
- Lazy-loaded modal form for adding users
- Includes form validation
- Emits new user data to the parent component
- Uses Reactive Forms

### UserService
- Manages user data using RxJS BehaviorSubject
- Provides methods to get users and add new users
- Calculates role distribution for the chart

## Acceptance Criteria

✅ User Table: Displays a table with columns for Name, Email, and Role
✅ Chart: Dynamic pie chart showing the distribution of roles (Admin, Editor, Viewer)
✅ Modal Popup: Lazy-loaded modal appears when "Add User" button is clicked
✅ Lazy Loading: Both UserFormComponent and Chart.js are loaded lazily
✅ RxJS: State managed via RxJS BehaviorSubject
✅ No Errors: No errors or warnings in the console
✅ Design Theme: Uses specified colors (#383838, #1c4980) and button/input size (48px)

## Bonus Features

- Responsive design for mobile and tablet devices
- Smooth animations and transitions
- Loading indicators during form submission
- Role badges with color coding
- Hover effects on table rows and buttons
- Navigate through users with previous/next buttons (5 users per page)
- Real-time search across name, email, and role fields

## License

MIT