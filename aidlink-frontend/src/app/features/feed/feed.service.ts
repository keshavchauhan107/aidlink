import { Injectable } from '@angular/core';
import { FeedItem } from './feed.model';
import { SAMPLE_FEED_DATA } from './feed.constant';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private allItems: FeedItem[] = SAMPLE_FEED_DATA;
  
  constructor(private api: ApiService) {}
  
  getFeedItems(page: number, limit: number = 5): Promise<FeedItem[]> {
    this.getPosts().subscribe({
      next: (res: any) => console.log("Response",res),
      error: (err) => console.error("Error",err)
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        resolve(this.allItems.slice(start, end));
      }, 800);
    });
  }


  createPost(data: any) {
    return this.api.post("/posts", data);
  }

  getPosts() {
    return this.api.get("/posts");
  }
  
}
