import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api, endpoints } from "src/environments/environment";
import { SuccessResponse } from "../_models/SuccessResponse.model";
import { TouitLiked } from "../_models/TouitLiked.model";
import { TouitPost } from "../_models/TouitPost.model";
import { TouitsBestof } from "../_models/TouitsBestof.model";
import { TouitsList } from "../_models/TouitsList.model";

@Injectable()
export class TouitsService {

  private ts: number = 0;
  isMockService: boolean = false;

  constructor(private http: HttpClient) {}

  getTs(): number {
    return this.ts;
  }

  setTs(ts: number): void {
    this.ts = ts;
  }

  getAllTouits(): Observable<TouitsList> {
    return this.http.get<TouitsList>(api.rootUrl + endpoints.touits + "?ts=" + this.ts);
  }

  likeTouit(id: number): Observable<TouitLiked> {
    return this.http.put<TouitLiked>((api.rootUrl + endpoints.like), "message_id=" + id);
  }

  dislikeTouit(id :number): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>((api.rootUrl + endpoints.dislike), {body: "message_id=" + id});
  }

  postTouit(touitPost: TouitPost): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>((api.rootUrl + endpoints.send), "name=" + touitPost.username + "&message=" + touitPost.message);
  }

  getBestTouits(): Observable<TouitsBestof> {
    return this.http.get<TouitsBestof>(api.rootUrl + endpoints.bestof + "?count=10");
  }
}