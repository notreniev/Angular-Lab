import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { IxModule } from '@siemens/ix-angular';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, IxModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  public id = input.required<string>();

  private todoService = inject(TodoService);

  public post = this.todoService.post;

  ngOnInit(): void {
    this.todoService.currentId$.next(this.id());
  }

  save(post: Post) {
    console.log('post saved', post);
  }
}
