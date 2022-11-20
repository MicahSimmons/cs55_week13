import Link from 'next/link'

export function PersonLink ( { id, name }) {
  return <Link key={"link"+id} href={"good/"+id}>
            <a key={id} className="list-group-item list-group-item-action">{name}</a>
         </Link>
}

export function PersonListTitle () {
  let text = "Post Listing";
  return <h2>{text}</h2>
}

export default function PersonList ( { peeps } ) {
    return <article className="col-md-5 col-12 bg-secondary mx-auto border border-2 rounded">
      <PersonListTitle />
      <div className="list-group">
        {peeps.map( ({id, name}) => <PersonLink key={"pl"+id} id={id} name={name} /> )}
      </div>
    </article>
    
}