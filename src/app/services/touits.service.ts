import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/environments/environment";
import { TouitsList } from "../models/TouitsList.model";

@Injectable()
export class TouitsService {

  constructor(private http: HttpClient) {}

  getAllTouits(): Observable<TouitsList> {
    const headers = {"Content-Type": "application/x-www-form-urlencoded"};
    return this.http.get<TouitsList>((api.rootUrl + api.touits), {headers: headers});
  }
}