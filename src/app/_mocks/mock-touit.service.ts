import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { TouitsList } from "../_models/TouitsList.model";

@Injectable()
export class MockTouitService {

  errorMode: boolean = false;

  getAllTouitsSuccessResponse: TouitsList = {
    messages: [
      {
        comments_count: 8,
        id: 1,
        is_user_authenticated: true,
        likes: 160,
        message: "Je viens de redémarrer le serveur. Have fun !",
        name: "Antho",
        ts: 1630932815695
      }
    ],
    ts: 1649505369
  }

  getAllTouitsErrorResponse: HttpErrorResponse = new HttpErrorResponse({
    status: 404,
    statusText: "Not Found"
  });

  getAllTouits(): Observable<TouitsList> {
    return this.errorMode
      ? throwError(() => this.getAllTouitsErrorResponse)
      : of(this.getAllTouitsSuccessResponse);
  }
}