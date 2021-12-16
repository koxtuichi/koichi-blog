import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post, getPosts, getDatabaseData, PostIndex, getPostIndex } from '@/lib/util/notion';
import Head from "next/head";
import React from 'react';

export const getStaticProps: GetStaticProps<{ posts: Post[], postsIndex: PostIndex[] }> = async () => {
    const database = await getDatabaseData();
    // console.dir(database, { depth: null })
    const posts = await getPosts(database);
    return {
        props: {
            posts: posts.splice(0, 10),
            postsIndex: getPostIndex(database)
        },
        revalidate: 60
    }
}

const Index = ({ posts, postsIndex }: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <div>
            <Head>
                <title>Cartesian Theater</title>
                <meta property="og:title" content="Cartesian Theater" />
                <meta property="og:image" content="https://diary.unronritaro.net/top.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:image" content="https://diary.unronritaro.net/top.png" />
            </Head>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#212529", fontSize: 16 }}>
                <img src="/head.jpg" style={{ margin: "24px auto", width: "60vw" }} />
                <div style={{ marginBottom: 16 }}>SHINJI SUGIMOTO</div>
                <div style={{ marginBottom: 16 }}>1998/8/4</div>
                <div style={{ marginBottom: 16 }}>Born in Mie, Japan.</div>
                <div style={{ marginBottom: 16 }}>---</div>
                <div style={{ marginBottom: 16 }}>Contact</div>
                <div style={{ marginBottom: 16 }}>sugimotoshinji11@gmail.com</div>
                <div style={{ marginBottom: 16 }}>Instagram</div>
                <div style={{ marginBottom: 16 }}>---</div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", margin: "auto 24px", width: "80vw" }}>
                {posts.sort((a, b) => a.num - b.num).map((post, i) => (
                    <React.Fragment>
                        <img src={post.url} style={{ height: 290, margin: "0 8px 12px 8px" }} />
                    </React.Fragment>
                ))}
                </div>
            </div>
        </div>

    );
}
export default Index;
