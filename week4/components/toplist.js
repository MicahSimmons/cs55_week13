import Link from 'next/link'

export function PersonLink ( { tag, id, name }) {
  return <Link key={"link"+id} href={tag+id}>
            <a key={id} className="list-group-item list-group-item-action">{name}</a>
         </Link>
}

export function PersonListTitle ( { isBad } ) {
  let text = (isBad) ? "Evil League of Evil" : "Greater Guys of Good";
  return <h2>{text}</h2>
}

export default function PersonList ( { peeps, isBad } ) {
    let tag = (isBad) ? '/evil/' : '/good/';
    return <article className="col-md-5 col-12 bg-secondary mx-auto border border-2 rounded">
      <PersonListTitle isBad={isBad} />
      <div className="list-group">
        {peeps.map( ({id, name}) => <PersonLink key={"pl"+id} tag={tag} id={id} name={name} /> )}
      </div>
    </article>
    
}