import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { TouitDisliked } from "../_models/TouitDisliked.model";
import { TouitLiked } from "../_models/TouitLiked.model";
import { TouitsList } from "../_models/TouitsList.model";

@Injectable()
export class MockTouitService {

  getAllTouitError: boolean = false;
  likeTouitError: boolean = false;
  dislikeTouitError: boolean = false;

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
    ts: 1649505369
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

  getDislikeTouitSuccessResponse(): TouitDisliked {
    return { success: true };
  }

  dislikeTouitErrorResponse: HttpErrorResponse = new HttpErrorResponse({
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

  dislikeTouit(): Observable<TouitDisliked>{
    return this.dislikeTouitError
      ? throwError(() => this.dislikeTouitErrorResponse)
      : of(this.getDislikeTouitSuccessResponse());
  }
}