class User {
  constructor() {
    this.subscriptions = [];
  }

  subscribe(streamingService) {
    if (!streamingService.name) {
      console.log("Streaming service doesnt exist");
    } else {
      this.subscriptions.push(streamingService);
    }

    return new Subscription(this.streamingService);
  }
}

class Subscription {
  constructor(streamingService) {
    this.streamingService = streamingService;
  }

  watch(show) {
    if (!show.name) {
      console.log("Show doesnt exist");
    } else {
      show.views += 1;
      this.streamingService.updateViews(show);
    }
  }

  getRecommendationTrending() {
    let currentYear = [];
    for (let i = 0; i < this.streamingService.shows.length; i++) {
      if (this.streamingService.shows[i].realeseDate == 2022) {
        currentYear.push(this.streamingService.shows[i]);
      }
    }
    const random = currentYear[Math.floor(Math.random() * currentYear.length)];

    return console.log(random);
  }

  getRecommendationByGenre(genre) {
    let askingGenre = [];
    for (let i = 0; i < this.streamingService.shows.length; i++) {
      if (this.streamingService.shows[i].genre == genre) {
        askingGenre.push(this.streamingService.shows[i]);
      }
    }
    const random = askingGenre[Math.floor(Math.random() * askingGenre.length)];

    return console.log(random);
  }
}

class StreamingService {
  constructor(name) {
    this.name = name;
    this.shows = [];
    this.viewsByShowName = {};
  }

  addShow(show) {
      this.shows.push(show);
      console.log(`Added ${show.name}`);
      this.viewsByShowName[show.name] = show.views;
  }

  updateViews(show) {
    this.viewsByShowName[show.name] = show.views;
  }

  getMostViewedShowsOfYear(year) {
    let requestedYear = [];
    for (let i = 0; i < this.shows.length; i++) {
      if (this.shows[i].realeseDate == year) {
        requestedYear.push(this.shows[i]);
      }
    }
    requestedYear.sort(function (x, y) {
      return y.views - x.views;
    });
    const last10 = requestedYear.slice(-10);
    return console.log(last10);
  }

  getMostViewedShowsOfGenre(genre) {
    let requestedGenre = [];
    for (let i = 0; i < this.shows.length; i++) {
      if (this.shows[i].genre == genre) {
        requestedGenre.push(this.shows[i]);
      }
    }
    requestedGenre.sort(function (x, y) {
      return y.views - x.views;
    });
    const last10 = requestedGenre.slice(-10);
    return console.log(last10);
  }
}

class Show {
  constructor(name, genre, realeseDate) {
    this.name = name;
    this.genre = genre;
    this.realeseDate = realeseDate;
    this.views = 0;
    this.duration = "1h";
  }

  getDuration() {
    return console.log(this.duration);
  }
}

class Movie extends Show {
  constructor(name, genre, realeseDate) {
    super(name, genre, realeseDate);
    this.views = 0;
    this.duration = "1h30m";
  }
}

class Episode extends Show {
  constructor(name, genre, realeseDate) {
    super(name, genre, realeseDate);
    this.views = 0;
    this.duration = "30m";
  }
}

class Series extends Show {
  constructor(name, genre, realeseDate, episodes) {
    super(name, genre, realeseDate);
    this.episodes = episodes;
    this.views = 0;
    this.duration = "45m";
  }
}

let user = new User();
let WalkingDead = new Movie("WalkingDead", "horror", "2022");
let SpiderMan = new Episode("Spiderman", "action", "2022");
let SuperMan = new Movie("SuperMan", "action", "2022");
let Batman = new Show("Batman", "action", "2022");
let Flash = new Series("Flash", "action", "2022", "34");
let netflix = new StreamingService("netflix");
let AmazonPrime = new StreamingService("AmazonPrime");
let netflixSub = new Subscription(netflix);
let amazonSub = new Subscription(AmazonPrime);
netflix.addShow(WalkingDead);
AmazonPrime.addShow(Batman);
AmazonPrime.addShow(Flash);
netflix.addShow(SuperMan);

netflix.addShow(SpiderMan);
user.subscribe(AmazonPrime);
user.subscribe(netflix);
netflixSub.watch(SuperMan);
netflixSub.watch(SuperMan);
netflixSub.watch(WalkingDead);
netflixSub.watch(WalkingDead);

netflixSub.watch(WalkingDead);
netflixSub.watch(SpiderMan);
netflixSub.watch(SpiderMan);
netflixSub.watch(SpiderMan);
netflixSub.watch(WalkingDead);
amazonSub.watch(Flash);

amazonSub.watch(Batman);
amazonSub.watch(Batman);

console.log(netflix.shows);

console.log(JSON.stringify(user.subscriptions, "", 2));

console.log(netflix.getMostViewedShowsOfYear(2022));
console.log(AmazonPrime.getMostViewedShowsOfGenre("action"));
console.log(Flash.getDuration());
console.log(Batman.getDuration())

console.log(netflixSub.getRecommendationTrending());
console.log(amazonSub.getRecommendationTrending());


console.log(netflixSub.getRecommendationByGenre("action"));
console.log(amazonSub.getRecommendationByGenre("action"));

