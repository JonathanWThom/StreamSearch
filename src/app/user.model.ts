export class User {
  public favoriteMovies: string[];
  public favoritePeople: string[];
  public favoriteShows: string[];
  constructor(public uid: string, public name: string, public image: string) {
    this.favoriteMovies = [];
  }
}
