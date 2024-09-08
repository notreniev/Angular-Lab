import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './core/components/sidebar/sidebar.component'
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BreadcrumbComponent],
})
export class AppComponent {
  title = 'todo-app'
}
