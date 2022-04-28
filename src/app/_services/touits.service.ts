import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/environments/environment";
import { SuccessResponse } from "../_models/SuccessResponse.model";
import { TouitLiked } from "../_models/TouitLiked.model";
import { TouitPost } from "../_models/TouitPost.model";
import { TouitsList } from "../_models/TouitsList.model";

@Injectable()
export class TouitsService {

  private ts: number = 0;

  constructor(private http: HttpClient) {}

  getTs(): number {
    return this.ts;
  }

  setTs(ts: number): void {
    this.ts = ts;
  }

  getAllTouits(): Observable<TouitsList> {
    return this.http.get<TouitsList>(api.rootUrl + api.touits + "?ts=" + this.ts);
  }

  likeTouit(id: number): Observable<TouitLiked> {
    return this.http.put<TouitLiked>((api.rootUrl + api.like), "message_id=" + id);
  }

  dislikeTouit(id :number): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>((api.rootUrl + api.dislike), {body: "message_id=" + id});
  }

  postTouit(touitPost: TouitPost): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>((api.rootUrl + api.send), "name=" + touitPost.username + "&message=" + touitPost.message);
  }
}