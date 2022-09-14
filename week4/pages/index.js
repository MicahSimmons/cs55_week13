import Head from 'next/head'
import Image from 'next/image'
import Layout from "../components/layout"
import styles from '../styles/Home.module.css'

import { getSortedList } from "../lib/data.js"
import PersonList from "../components/toplist"

export async function getStaticProps () {
  const goodGuys = await getSortedList(true);
  const badGuys = await getSortedList(false);
  return {
      props: {
          heroes:   goodGuys,
          villains: badGuys
      }
  };
}

export default function Home( { heroes, villains }) {
  return (
    <Layout home>
      <div className="container">
        <div className="row text-center">
          <h1>Heroes vs. Villains</h1>
        </div>
        <div className="row align-center">
          <PersonList peeps={heroes} />
          <PersonList peeps={villains} isBad />
        </div>
      </div>
    </Layout>
  )
}
