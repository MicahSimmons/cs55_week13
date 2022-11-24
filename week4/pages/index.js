import Head from 'next/head'
import Image from 'next/image'
import Layout from "../components/layout"
import styles from '../styles/Home.module.css'

import { getSortedList } from "../lib/data.js"
import { getContactsList } from "../lib/contacts.js"
import PersonList from "../components/toplist"

export async function getStaticProps () {
  const goodGuys = await getSortedList(true);
  const contacts = await getContactsList();
  return {
      props: {
          heroes:   goodGuys,
          contacts: contacts
      }
  };
}

export default function Home( { heroes, contacts }) {
  return (
    <Layout home>
      <div className="container">
        <div className="row text-center">
          <h1>Testing WP CDN Front-end</h1>
        </div>
        <div className="row align-center">
          <PersonList peeps={heroes} />
        </div>
      </div>
    </Layout>
  )
}
