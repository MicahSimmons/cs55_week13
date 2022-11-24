//import FS from 'fs';
import PATH from 'path';
const FS = require('fs').promises;

async function fetchContactInfo () {
    //let fileName = "wptest.json";
    //const dataDir = PATH.join( process.cwd(), "data");
    //const filepath = PATH.join( dataDir, fileName );
    //const textData = await FS.readFile(filepath, 'utf8');
    //const jsonData = JSON.parse(textData);

    const new_contacts_url = "https://dev-mouse-test.pantheonsite.io/wp-json/twentytwentytwo-child/v1/contacts"
    let rsp = await fetch(new_contacts_url)
    let newJsonData = await rsp.json();

    return newJsonData;
}

export async function getContactUids () {
    const jsonObj = await fetchContactInfo();

    return jsonObj.map( (obj) => { 
        return {
            params: {
                id: obj["id"].toString()
            }
        }
    });
}

export async function getContactsList () {
    const jsonObj = await fetchContactInfo();
    let flatJson = jsonObj.map( (item) => {
        return {
            ...item,
            ...(JSON.parse("{" + item.acf_fields + "}"))
        };
    })

    console.log(flatJson);
    return flatJson.sort( (a,b) => { return a.post_name.localeCompare(b.post_name) } )
           .map( (item) => {
             return {
                id: item["id"].toString(),
                name: item.post_name
             }
           });
}

export async function getContactsCommon(uid) {
    const jsonObj = await fetchContactInfo();

    let objMatch = jsonObj.filter( (obj) => { return (obj["id"].toString() === uid) })

    var objReturned = {};
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    }

    console.log("Found:" + objReturned["name"]);
    return objReturned;
}

export async function getContactsData(uid) {
    let objReturned = await getContactsCommon(uid);
    return objReturned;
}