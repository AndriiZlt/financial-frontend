import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { BoardItemToAdd } from "../models/BoardItemToAdd.model";
import { BoardItem } from "../models/BoardItem.model";

@Injectable({
  providedIn: "root",
})
export class BoardApiService extends ApiService {
  apiName = "Board";
  v = 1;

  getBoardItems(): Observable<BoardItem[]> {
    return this.get<BoardItem[]>("getboard");
  }

  addItemToBoard(itemToAdd: BoardItemToAdd): Observable<BoardItem> {
    return this.post<BoardItem>(`addboard`, itemToAdd);
  }
}
