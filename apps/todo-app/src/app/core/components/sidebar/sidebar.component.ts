import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public links = [
    { path: 'feature1' },
    { path: 'feature2' },
    { path: 'feature1/feature1a' },
    { path: 'feature1/feature2a' },
    { path: 'feature3' },
    { path: 'feature4' },
  ];
}
