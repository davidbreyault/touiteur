import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { api, endpoints } from "src/environments/environment";
import { Comment, CommentsList } from "../_models/Comment";

@Injectable()
export class CommentsService {

  constructor(private http: HttpClient) {}

  getTouitComments(touitId: number): Observable<CommentsList> {
    return this.http.get<CommentsList>((api.rootUrl + endpoints.comments) + "?message_id=" + touitId)
      .pipe(tap(data => data.comments.sort((a: Comment, b: Comment) => b.ts - a.ts)));
  }
}