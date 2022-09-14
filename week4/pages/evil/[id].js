import Head from 'next/head'
import Layout from "../../components/layout"
import PersonCommon from "../../components/person"

import { getUids, getData } from '../../lib/data';

export async function getStaticPaths () {
    const paths = getUids();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ( { params } ) {
    const itemData = await getData(false, params.id);
    return {
        props: {
            itemData
        }
    };
}

export default function Suspect ( { itemData } ) {
    return (
    <Layout>
        <PersonCommon info={itemData} />
    </Layout>
    )
}