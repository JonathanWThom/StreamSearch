import { Injectable } from '@angular/core';
import { Actor } from './actor.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Keys } from './api-keys';

@Injectable()
export class ActorService {

  constructor(private http: Http) { }
  getActorDetails(actorID: string){
    return this.http.get("http://api-public.guidebox.com/v2/person/".concat(actorID).concat("/?api_key=").concat(Keys.guidebox))
  }
  getActorCredits(actorID: string){

    return this.http.get("http://api-public.guidebox.com/v2/person/".concat(actorID).concat("/credits?api_key=").concat(Keys.guidebox).concat("&role=cast&limit=25"))
  }
}
