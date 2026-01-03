import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private api: ApiService) {}

  createPost(data: any) {
    return this.api.post("/posts", data);
  }

  getPosts() {
    return this.api.get("/posts");
  }
}
