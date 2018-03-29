import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<leader[]> {
    return Observable.of(LEADERS).delay(2000);
  }

  getLeader(id: number): Observable<leader> {
    return Observable.of(LEADERS.filter((leader) => (leader.id === id ))[0]).delay(2000);
      
  }
  
  getFeaturedLeader(): Observable<leader> {
    return  Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
    
  }
  
}
