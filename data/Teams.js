import Team from "./Team.js";

class teams {
    // Eastern Conference:

    // Atlantic Division
    BOS = new Team("Atlantic Division","Eastern Conference","BOS","Boston Bruins", "/TeamLogos/AtlanticDivision/BOS.png");
    BUF = new Team("Atlantic Division","Eastern Conference","BUF","Buffalo Sabres", "/TeamLogos/AtlanticDivision/BUF.png");
    DET = new Team("Atlantic Division","Eastern Conference","DET","Detroit Red Wings", "/TeamLogos/AtlanticDivision/DET.png");
    FLA = new Team("Atlantic Division","Eastern Conference","FLA","Florida Panthers", "/TeamLogos/AtlanticDivision/FLA.png");
    MTL = new Team("Atlantic Division","Eastern Conference","MTL","Montreal Canadiens", "/TeamLogos/AtlanticDivision/MTL.png");
    OTT = new Team("Atlantic Division","Eastern Conference","OTT","Ottawa Senators", "/TeamLogos/AtlanticDivision/OTT.png");    
    TBL = new Team("Atlantic Division","Eastern Conference","TB","Tampa Bay Lightning", "/TeamLogos/AtlanticDivision/TBL.png");
    TOR = new Team("Atlantic Division","Eastern Conference","TOR","Toronto Maple Leafs", "/TeamLogos/AtlanticDivision/TOR.png");

    // Metropolitan Division
    CAR = new Team("Metropolitan Division","Eastern Conference","CAR","Carolina Hurricanes", "/TeamLogos/MetropolitanDivision/CAR.png");
    CBJ = new Team("Metropolitan Division","Eastern Conference","CBJ","Columbus Blue Jackets", "/TeamLogos/MetropolitanDivision/CBJ.png");
    NJD = new Team("Metropolitan Division","Eastern Conference","NJ","New Jersey Devils", "/TeamLogos/MetropolitanDivision/NJD.png");
    NYI = new Team("Metropolitan Division","Eastern Conference","NYI","New York Islanders", "/TeamLogos/MetropolitanDivision/NYI.png");
    NYR = new Team("Metropolitan Division","Eastern Conference","NYR","New York Rangers", "/TeamLogos/MetropolitanDivision/NYR.png");
    PHI = new Team("Metropolitan Division","Eastern Conference","PHI","Philadelphia Flyers", "/TeamLogos/MetropolitanDivision/PHI.png");
    PIT = new Team("Metropolitan Division","Eastern Conference","PIT","Pittsburgh Penguins", "/TeamLogos/MetropolitanDivision/PIT.png");
    WSH = new Team("Metropolitan Division","Eastern Conference","WSH","Washington Capitals", "/TeamLogos/MetropolitanDivision/WSH.png");

    // Western Conference:

    // Central Division
    CHI = new Team("Central Division","Western Conference","CHI","Chicago Blackhawks", "/TeamLogos/CentralDivision/CHI.png");
    COL = new Team("Central Division","Western Conference","COL","Colorado Avalanche", "/TeamLogos/CentralDivision/COL.png");
    DAL = new Team("Central Division","Western Conference","DAL","Dallas Stars", "/TeamLogos/CentralDivision/DAL.png");
    MIN = new Team("Central Division","Western Conference","MIN","Minnesota Wild", "/TeamLogos/CentralDivision/MIN.png");
    NSH = new Team("Central Division","Western Conference","NSH","Nashville Predators", "/TeamLogos/CentralDivision/NSH.png");
    STL = new Team("Central Division","Western Conference","STL","St. Louis Blues", "/TeamLogos/CentralDivision/STL.png");
    UTA = new Team("Central Division","Western Conference","UTA","Utah Mammoth", "/TeamLogos/CentralDivision/UTA.png");
    WPG = new Team("Central Division","Western Conference","WPG","Winnipeg Jets", "/TeamLogos/CentralDivision/WPG.png");

    // Pacific Division
    ANA = new Team("Pacific Division","Western Conference","ANA","Anaheim Ducks", "/TeamLogos/PacificDivision/ANA.png");
    CGY = new Team("Pacific Division","Western Conference","CGY","Calgary Flames", "/TeamLogos/PacificDivision/CGY.png");
    EDM = new Team("Pacific Division","Western Conference","EDM","Edmonton Oilers", "/TeamLogos/PacificDivision/EDM.png");
    LAK = new Team("Pacific Division","Western Conference","LA","Los Angeles Kings", "/TeamLogos/PacificDivision/LAK.png");
    SJS = new Team("Pacific Division","Western Conference","SJ","San Jose Sharks", "/TeamLogos/PacificDivision/SJS.png");
    SEA = new Team("Pacific Division","Western Conference","SEA","Seattle Kraken", "/TeamLogos/PacificDivision/SEA.png");
    VAN = new Team("Pacific Division","Western Conference","VAN","Vancouver Canucks", "/TeamLogos/PacificDivision/VAN.png");
    VGK = new Team("Pacific Division","Western Conference","VGK","Vegas Golden Knights", "/TeamLogos/PacificDivision/VGK.png");

    //put these teams in an array
    allTeams = [this.BOS, this.BUF, this.DET, this.FLA, this.MTL, this.OTT, this.TBL, this.TOR,
                this.CAR, this.CBJ, this.NJD, this.NYI, this.NYR, this.PHI, this.PIT, this.WSH,
                this.CHI, this.COL, this.DAL, this.MIN, this.NSH, this.STL, this.UTA, this.WPG,
                this.ANA, this.CGY, this.EDM, this.LAK, this.SJS, this.SEA, this.VAN, this.VGK];

    getTeamByIndex(index){
        return this.allTeams[index];
    }

    getTeamById(id) {
        return this.allTeams.find(team => team.getId() === id);
    }

    getTeamByName(name){
        return this.allTeams.find(team => team.getName() === name);
    }

    getTeamByDivision(division) {
        return this.allTeams.filter(team => team.getDivision() === division);
    }

}

export default teams;
