//import { getData } from "../lib/data"
import Link from 'next/link'


export function NemLink ( { name, isHero, uid } ) {
  let tag = (isHero) ? "/good/" : "/evil/";
  return <div className="my-3 p-2 border-top">
    <h7>Known Associates:</h7>
    <div className="list-group">
          <Link key={"link"+uid} href={tag+uid}>
            <a key={uid} className="list-group-item list-group-item-action">{name}</a>
          </Link>
    </div>  
  </div>
  

}



export default function PersonCommon ( { info } ) {
  console.log(info);
    return ( <>
      <div className="row text-center">
        <h1>Contact Details for {info.name}</h1>
      </div>
      <article className="card col-6 m-auto my-3">
        <div className="card-body">
            <h5 className="card-title">{info.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{info.alias}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{
                (info.hero) ? "Hero" : "Villain"
            }</h6>
            <p className="card-text">Born on: {info.dob}</p>
            <a href={'mailto:'+info.email} className="card-link">{info.email}</a>
            <NemLink name={info.nemData.name} isHero={!info.hero} uid={info.nemData.uid}></NemLink>
        </div>
      </article>
      </>
    );
}