import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  private usersSubscription: Subscription | null = null;
  private chartInstance: any = null;
  private chartJsLoaded = false;
  isModalOpen = false;

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  get filteredUsers(): User[] {
    if (!this.searchTerm.trim()) {
      return this.users;
    }
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.currentPage = 1;
      if (this.chartJsLoaded) {
        this.updateChart();
      }
    });

    // Lazy load Chart.js
    this.loadChartJs();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private async loadChartJs(): Promise<void> {
    try {
      const Chart = await import('chart.js/auto');
      this.chartJsLoaded = true;
      this.initChart(Chart.default);
    } catch (error) {
      console.error('Error loading Chart.js:', error);
    }
  }

  private initChart(Chart: any): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const roleDistribution = this.userService.getRoleDistribution();

    this.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [{
          data: [roleDistribution['Admin'], roleDistribution['Editor'], roleDistribution['Viewer']],
          backgroundColor: [
            '#1c4980',
            '#383838',
            '#6c757d'
          ],
          borderColor: [
            '#1c4980',
            '#383838',
            '#6c757d'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'User Role Distribution',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          }
        }
      }
    });
  }

  private updateChart(): void {
    if (!this.chartInstance) return;

    const roleDistribution = this.userService.getRoleDistribution();
    this.chartInstance.data.datasets[0].data = [
      roleDistribution['Admin'],
      roleDistribution['Editor'],
      roleDistribution['Viewer']
    ];
    this.chartInstance.update();
  }

  openAddUserModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onUserAdded(user: User): void {
    this.closeModal();
  }
}