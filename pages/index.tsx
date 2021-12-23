import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post, getPosts, getDatabaseData, PostIndex, getPostIndex } from '@/lib/util/notion';
import Head from "next/head";
import React, { useState } from 'react';
import Link from 'next/link'
import { Dialog, DialogContent } from '@material-ui/core';

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
    const [selectedPhoto, openPhoto] = useState<any>(null);
    return (
        <div>
            <Head>
                <title>Cartesian Theater</title>
                <meta property="og:title" content="Cartesian Theater" />
                <meta property="og:image" content="https://diary.unronritaro.net/top.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:image" content="https://diary.unronritaro.net/top.png" />
            </Head>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#212529", fontSize: 16, whiteSpace: "nowrap" }}>
                <img src="/head.jpg" style={{ margin: "24px auto", width: "60vw" }} />
                <div style={{ marginBottom: 16 }}>SHINJI SUGIMOTO</div>
                <div style={{ marginBottom: 16 }}>1998/8/4</div>
                <div style={{ marginBottom: 16 }}>Born in Mie, Japan.</div>
                <div style={{ marginBottom: 16 }}>---</div>
                <div style={{ marginBottom: 16 }}>Contact</div>
                <div style={{ marginBottom: 16 }}>sugimotoshinji11@gmail.com</div>
                <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link href={'https://www.instagram.com/shinjisugimoto84/?igshid=1eh2ijp64yeun'}>
                        <img src="/insta.png" style={{ width: 30, height: 30, cursor: "pointer" }} alt="insta"/>
                    </Link>
                    <div>Instagram</div>
                </div>
                <div style={{ marginBottom: 16 }}>---</div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", margin: "auto 24px", width: "80vw" }}>
                {posts.sort((a, b) => a.num - b.num).map((post, i) => (
                    <React.Fragment key={i}>
                        <img src={post.url} style={{ maxHeight: 290, margin: "0 8px 12px 8px", cursor: "pointer" }} onClick={() => openPhoto(post)} />
                    </React.Fragment>
                ))}
                </div>
            </div>
            <Dialog
                open={!!selectedPhoto}
                onClose={() => openPhoto(null)}
                PaperProps={{ style:{ padding: 4 } }}>
                <DialogContent style={{ padding: 0 }}>
                    <img src={selectedPhoto && selectedPhoto.url} style={{ overflow: "hidden" }} onClick={() => openPhoto(null)} />
                </DialogContent>
            </Dialog>
        </div>

    );
}
export default Index;
