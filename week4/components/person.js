//import { getData } from "../lib/data"
import Link from 'next/link'


export default function PersonCommon ( { info } ) {
  console.log(info);
    return ( <>
      <div className="row text-center">
        <h1>Content Details for {info.post_name}</h1>
      </div>
      <article className="card col-6 m-auto my-3">
        <div className="card-body">
            <h5 className="card-title">{info.post_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{info.post_date}</h6>
            <div className="card-text" dangerouslySetInnerHTML={{__html: info.post_content}} />
            <a href={'mailto:'+info.email} className="card-link">{info.email}</a>
        </div>
      </article>
      </>
    );
}