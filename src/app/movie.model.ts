export class Movie {
  public rating: string;
  public overview: string;
  public genre: Object[];
  public tags: Object[];
  public duration: number;
  public trailers: Object[];
  public writers: Object[];
  public directors: Object[];
  public purchase_web_sources: Object[];


  constructor(public title: string, public id: string, public cast: Object[], public release_year: number, public in_theatres: boolean, public release_date: string, public rotten_tomatoes: number, public metacritic: string, public poster_small: string, public poster_medium: string, public poster_large: string, public tmdb_id: number) {}
}
