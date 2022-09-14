import FS from 'fs';
import PATH from 'path';

const dataDir = PATH.join( process.cwd(), "data");
// const filepath = PATH.join( dataDir, "suspects.json" );
// const jsonData = FS.readFileSync(filepath);
// const jsonObj = JSON.parse(jsonData);

export function getUids (isGoodGuys) {
    let fileName = (isGoodGuys) ? "heros.json" : "suspects.json";

    const dataDir = PATH.join( process.cwd(), "data");
    const filepath = PATH.join( dataDir, fileName );
    const jsonData = FS.readFileSync(filepath, 'utf8');
    const jsonObj = JSON.parse(jsonData);
    return jsonObj.map( (obj) => { 
        return {
            params: {
                id: obj.uid.toString()
            }
        }
    });
}

export function getSortedList (isGoodGuys) {
    let fileName = (isGoodGuys) ? "heros.json" : "suspects.json";

    const filepath = PATH.join( dataDir, fileName );
    const jsonData = FS.readFileSync(filepath);
    const jsonObj = JSON.parse(jsonData);
  
    return jsonObj.sort( (a,b) => { return a.name.localeCompare(b.name) } )
           .map( (item) => {
            return {
                id: item.uid.toString(),
                name: item.name
            }
    });
}

export function getDataCommon(isGoodGuys, uid) {
    let fileName = (isGoodGuys) ? "heros.json" : "suspects.json";
    console.log("Finding " + uid + " in " + fileName);

    const dataDir = PATH.join( process.cwd(), "data");
    const filepath = PATH.join( dataDir, fileName );
    const jsonData = FS.readFileSync(filepath, 'utf8');
    const jsonObj = JSON.parse(jsonData);
    let objMatch = jsonObj.filter( (obj) => { return (obj.uid.toString() === uid) })

    var objReturned = {};
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
        objReturned["hero"] = isGoodGuys;
    }

    console.log("Found:" + objReturned["name"]);
    return objReturned;
}

export function getNemData(isGoodGuys, uid) {
    console.log("good:" + isGoodGuys + " uid:" + uid);
    let nemList = getDataCommon(isGoodGuys, uid)
    return nemList;
}

export async function getData(isGoodGuys, uid) {
    let objReturned = getDataCommon(isGoodGuys, uid);
    objReturned["nemData"] = getDataCommon(!isGoodGuys, objReturned.nemesis.toString());
    return objReturned;
}