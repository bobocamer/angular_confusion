import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<leader[]> {
    return new Promise(resolve =>{
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  getLeader(id: number): Promise<leader> {
    return new Promise(resolve => {
       // Simulate server latency with 2 second delay
       setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id ))[0]), 2000);
    });   
  }
  
  getFeaturedLeader(): Promise<leader> {
    return  new Promise(resolve => {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
  }
  
}
