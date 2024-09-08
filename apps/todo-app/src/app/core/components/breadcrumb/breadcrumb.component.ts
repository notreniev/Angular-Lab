import { Component, computed, inject } from '@angular/core'
import { CommonModule, TitleCasePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { BreadcrumbService } from './services/breadcrumb.service'
import { IxModule } from '@siemens/ix-angular'

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, IxModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  protected readonly breadcrumbsService = inject(BreadcrumbService)

  breadcrumbs = computed(() => this.breadcrumbsService.breadcrumbsSignal())

  constructor() {
    console.log('breadcrumbs signal:', this.breadcrumbs())
  }
}
