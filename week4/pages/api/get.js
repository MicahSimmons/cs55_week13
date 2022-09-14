// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import FS from 'fs';
import PATH from 'path';

const dataDir = PATH.join( process.cwd(), "data");
console.log(dataDir);

export default function handler(req, res) {
  const filepath = PATH.join( dataDir, "suspects.json" );
  const jsonData = FS.readFileSync(filepath);
  const jsonObj = JSON.parse(jsonData);

  jsonObj.sort( (a,b) => { return a.name.localeCompare(b.name) } )

  res.status(200).json(jsonObj)
}
