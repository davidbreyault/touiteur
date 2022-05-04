import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { SuccessResponse } from "../_models/SuccessResponse.model";
import { Touit } from "../_models/Touit.model";
import { TouitLiked } from "../_models/TouitLiked.model";
import { TouitPost } from "../_models/TouitPost.model";
import { TouitsList } from "../_models/TouitsList.model";

@Injectable()
export class MockTouitService {

  isMockService: boolean = true;
  getAllTouitError: boolean = false;
  likeTouitError: boolean = false;
  dislikeTouitError: boolean = false;
  postTouitError: boolean = false;

  private ts: number = 0;

  touitsList: TouitsList = {
    messages: [
      {
        comments_count: 8,
        id: 1,
        is_user_authenticated: true,
        likes: 160,
        message: "Je viens de redémarrer le serveur. Have fun !",
        name: "Antho",
        ts: 1630932815695
      },
      {
        comments_count: 0,
        id: 2,
        is_user_authenticated: true,
        likes: 4,
        message: "Je veux des frites !",
        name: "John",
        ts: 1630932815695
      }
    ],
    ts: 1630932815695
  }

  getTs(): number {
    return this.ts;
  }

  setTs(ts: number): void {
    this.ts = ts;
  }

  getAllTouitsSuccessResponse(): TouitsList {
    return this.touitsList;
  }

  allTouitsErrorResponse: HttpErrorResponse = new HttpErrorResponse({
    error: "Le serveur n'a pas trouvé la ressource demandée.",
    status: 404,
    statusText: "Not Found"
  });

  getLikeTouitSuccessResponse(id: string): TouitLiked {
    return {
      id: id,
      success: true
    };
  }

  likeTouitErrorResponse: HttpErrorResponse = new HttpErrorResponse({
    error: "Le serveur n'a pas trouvé la ressource demandée.",
    status: 404,
    statusText: "Not Found"
  });

  getSuccessResponse(): SuccessResponse {
    return { success: true };
  }

  dislikeTouitErrorResponse: HttpErrorResponse = new HttpErrorResponse({
    error: "Le serveur n'a pas trouvé la ressource demandée.",
    status: 404,
    statusText: "Not Found"
  });

  postTouitErrorResponse: HttpErrorResponse = new HttpErrorResponse({
    error: "Le serveur n'a pas trouvé la ressource demandée.",
    status: 404,
    statusText: "Not Found"
  });

  getAllTouits(): Observable<TouitsList> {
    return this.getAllTouitError
      ? throwError(() => this.allTouitsErrorResponse)
      : of(this.getAllTouitsSuccessResponse());
  }

  likeTouit(id: number): Observable<TouitLiked>{
    return this.likeTouitError
      ? throwError(() => this.likeTouitErrorResponse)
      : of(this.getLikeTouitSuccessResponse(id.toString()));
  }

  dislikeTouit(): Observable<SuccessResponse>{
    return this.dislikeTouitError
      ? throwError(() => this.dislikeTouitErrorResponse)
      : of(this.getSuccessResponse());
  }

  postTouit(touitPost: TouitPost): Observable<SuccessResponse> {
    if (!this.postTouitError) {
      let touitPosted = new Touit();
      touitPosted.comments_count = 0;
      touitPosted.id = this.touitsList.messages.length;
      touitPosted.is_user_authenticated = true;
      touitPosted.likes = 0;
      touitPosted.message = touitPost.message;
      touitPosted.name = touitPost.username;
      touitPosted.ts = new Date().getTime();
      this.touitsList.ts = touitPosted.ts;
      this.touitsList.messages.unshift(touitPosted);
      return of(this.getSuccessResponse());
    } 
    else {
      return throwError(() => this.postTouitErrorResponse);
    }
  }
}
