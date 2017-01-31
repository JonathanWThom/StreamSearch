export class User {
  public favoriteMovies: Object[];
  public favoritePeople: Object[];
  public favoriteShows: Object[];
  constructor(public uid: string, public name: string, public image: string) {}
}
