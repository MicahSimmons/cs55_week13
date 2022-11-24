//import FS from 'fs';
import PATH from 'path';
const FS = require('fs').promises;

async function getFileData () {
    let fileName = "wptest.json";
    const dataDir = PATH.join( process.cwd(), "data");
    const filepath = PATH.join( dataDir, fileName );
    const textData = await FS.readFile(filepath, 'utf8');
    const jsonData = JSON.parse(textData);

    const new_posts_url = "https://dev-mouse-test.pantheonsite.io/wp-json/twentytwentytwo-child/v1/latest-posts/1"
    let rsp = await fetch(new_posts_url)
    let newJsonData = await rsp.json();

    return newJsonData;
}

export async function getUids () {
    const jsonObj = await getFileData();

    return jsonObj.map( (obj) => { 
        return {
            params: {
                id: obj["ID"].toString()
            }
        }
    });
}

export async function getSortedList () {
    const jsonObj = await getFileData();
  
    return jsonObj.sort( (a,b) => { return a.post_name.localeCompare(b.post_name) } )
           .map( (item) => {
            return {
                id: item["ID"].toString(),
                name: item.post_name
            }
    });
}

export async function getDataCommon(uid) {
    const jsonObj = await getFileData();

    let objMatch = jsonObj.filter( (obj) => { return (obj["ID"].toString() === uid) })

    var objReturned = {};
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    }

    console.log("Found:" + objReturned["name"]);
    return objReturned;
}

export async function getData(uid) {
    let objReturned = await getDataCommon(uid);
    return objReturned;
}