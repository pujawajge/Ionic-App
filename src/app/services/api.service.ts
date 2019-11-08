import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:Http) { }

	//get all cards list
	get_cards(){    
        return this.http.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52').pipe(map((res =>res)),
	        tap(res => {}));
    }
}
