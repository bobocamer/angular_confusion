import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Promise<leader> {
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id ))[0]);
  }
  
  getFeaturedLeader(): Promise<leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
