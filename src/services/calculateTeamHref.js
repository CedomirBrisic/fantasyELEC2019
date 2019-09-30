const calculateTeamHref = (teamName, league) => {
    const euroLeagueHrefs = {
        "ALBA BERLIN":"BER",
        "ANADOLU EFES ISTANBUL":"IST",
        "AX ARMANI EXCHANGE MILAN":"MIL",
        "CRVENA ZVEZDA MTS BELGRADE":"RED",
        "CSKA MOSCOW":"CSK",
        "FC BARCELONA":"BAR",
        "FC BAYERN MUNICH":"MUN",
        "FENERBAHCE BEKO ISTANBUL":"ULK",
        "KHIMKI MOSCOW REGION":"KHI",
        "KIROLBET BASKONIA VITORIA-GASTEIZ":"BAS",
        "LDLC ASVEL VILLEURBANNE":"ASV",
        "MACCABI FOX TEL AVIV":"TEL",
        "OLYMPIACOS PIRAEUS":"OLY",
        "PANATHINAIKOS OPAP ATHENS":"PAN",
        "REAL MADRID":"MAD",
        "VALENCIA BASKET":"PAM",
        "ZALGIRIS KAUNAS":"ZAL",
        "ZENIT ST PETERSBURG":"DYR"
    }

    const euroCupHrefs = {
        "AS MONACO":"MCO",
        "ASSECO ARKA GDYNIA":"SOP",
        "BUDUCNOST VOLI PODGORICA":"BUD",
        "CEDEVITA OLIMPIJA LJUBLJANA":"LJU",
        "DARUSSAFAKA TEKFEN ISTANBUL":"DAR",
        "DOLOMITI ENERGIA TRENTO":"TRN",
        "EWE BASKETS OLDENBURG":"OLD",
        "GALATASARAY DOGA SIGORTA ISTANBUL":"GAL",
        "GERMANI BRESCIA LEONESSA":"BRE",
        "JOVENTUT BADALONA":"JOV",
        "LIMOGES CSP":"LMG",
        "LOKOMOTIV KUBAN KRASNODAR":"TIV",
        "MACCABI RISHON LEZION":"RIS",
        "MORABANC ANDORRA":"ANR",
        "NANTERRE 92":"NTR",
        "PARTIZAN NIS BELGRADE":"PAR",
        "PROMITHEAS PATRAS":"PAT",
        "RATIOPHARM ULM":"ULM",
        "RYTAS VILNIUS":"LIE",
        "SEGAFREDO VIRTUS BOLOGNA":"VIR",
        "TOFAS BURSA":"BUR",
        "UMANA REYER VENICE":"VNC",
        "UNICAJA MALAGA":"MAL",
        "UNICS KAZAN":"UNK"
    }
    if (league == "euroLeague"){
        return `https://www.euroleague.net/competition/teams/showteam?clubcode=${euroLeagueHrefs[teamName]}&seasoncode=E2019`
    } else if (league == "euroCup"){
        return `https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=${euroCupHrefs[teamName]}&seasoncode=U2019`
    }
}


export default calculateTeamHref