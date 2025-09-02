class Team {
    #conference;
    #division;
    #id;
    #name;
    #logo;
    #tablePosition;
    #points;
    #totalMatchesPlayed;

    constructor(division, conference, id, name, logo) {
        this.#division = division;
        this.#conference = conference;
        this.#id = id;
        this.#name = name;
        this.#logo = logo;
        this.#tablePosition = 0;
        this.#points = 0;
        this.#totalMatchesPlayed = 0;
    }

    incMatchesBy1(){
        this.#totalMatchesPlayed++;
    }

    // Increment points by 2
    incrementPointsBy2() {
        this.#points += 2;
    }
    
    // Increment points by 1
    incrementPointsBy1() {
        this.#points += 1;
    }

    setTotalMatchesPlayed(matches){
        this.#totalMatchesPlayed = matches;
    }
    setPoints(points) {
        this.#points = points;
    }

    setPosition(position) {
        this.#tablePosition = position;
    }

    getMatches(){
        return this.#totalMatchesPlayed;
    }

    getPoints() {
        return this.#points;
    }

    getConference() {
        return this.#conference;
    }

    getDivision() {
        return this.#division;
    }

    getName() {
        return this.#name;
    }

    getLogo() {
        return this.#logo;
    }

    getPosition() {
        return this.#tablePosition;
    }

    getId() {
        return this.#id;
    }
}

export default Team;