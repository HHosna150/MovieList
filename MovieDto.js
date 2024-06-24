export class MovieCard {
  constructor(title, poster_path, id) {
    this.title = title;
    this.poster_path = poster_path;
    this.id = id;
  }
}

export class MovieDetail {
  constructor(details, cast, director) {
    this.details = details;
    this.cast = cast;
    this.director = director;
  }
}
