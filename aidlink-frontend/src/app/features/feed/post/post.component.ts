import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostModel } from '../feed.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { RippleModule } from 'primeng/ripple';
import { PostService } from './post.service';

@Component({ 
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, CardModule, ButtonModule, AvatarModule, ImageModule, RippleModule]

})
export class PostComponent {
  posts = signal<any[]>([]);
  loading = signal(false);

  postForm: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private postService: PostService
  ) {}
  
  ngOnInit() {
    this.loadPosts();
    this.postForm=this.fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required]
    });
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (res: any) => (this.posts.set(res))
    });
  }

  submitPost() {
    if (this.postForm.invalid) return;

    this.loading.set(true);

    this.postService.createPost({
      ...this.postForm.value,
      userId: 1 // TEMP (later from auth)
    }).subscribe({
      next: () => {
        this.postForm.reset();
        this.loadPosts();
        this.loading.set(false);
      },
      error: () => (this.loading.set(false))
    });
  }
}
