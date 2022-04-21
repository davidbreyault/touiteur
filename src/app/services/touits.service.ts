import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/environments/environment";
import { TouitDisliked } from "../models/TouitDisliked.model";
import { TouitLiked } from "../models/TouitLiked.model";
import { TouitsList } from "../models/TouitsList.model";

@Injectable()
export class TouitsService {

  constructor(private http: HttpClient) {}

  getAllTouits(): Observable<TouitsList> {
    return this.http.get<TouitsList>(api.rootUrl + api.touits);
  }

  likeTouit(id: number): Observable<TouitLiked> {
    return this.http.put<TouitLiked>((api.rootUrl + api.like), "message_id=" + id);
  }

  dislikeTouit(id :number): Observable<TouitDisliked> {
    return this.http.delete<TouitDisliked>((api.rootUrl + api.dislike), {body: "message_id=" + id});
  }
}