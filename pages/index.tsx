import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post, getPageDatas } from '@/lib/util/notion';
import Head from "next/head";
import React, { useState } from 'react';
import Link from 'next/link'
import { Dialog, DialogContent } from '@material-ui/core';
import Image from 'next/image';

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
    const posts = await getPageDatas();
    return {
        props: {
            posts: posts,
        },
        revalidate: 1
    }
}

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [selectedPhoto, openPhoto] = useState<any>(null);
    return (
        <div>
            <Head>
                <title>SHINJI SUGIMOTO</title>
                <meta property="og:title" content="SHINJI SUGIMOTO" />
                <meta property="og:image" content="/public/shinjiPhotoMainImg.jpg" />
                <meta name="twitter:card" content="SHINJI SUGIMOTO" />
                <meta name="twitter:image" content="/public/shinjiPhotoMainImg.jpg" />
            </Head>
            <div style={{ color: "#4b4e45", fontFamily: "Bebas Neue, cursive", fontWeight: 400, fontSize: "26px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", whiteSpace: "nowrap" }}>
                <img src="/head.jpg" style={{ width: "100vw", marginBottom: "24px" }} alt="head"/>
                <div style={{ marginBottom: 16 }}>SHINJI SUGIMOTO</div>
                <div style={{ marginBottom: 16 }}>1998/8/4</div>
                <div style={{ marginBottom: 16 }}>Born in Mie, Japan.</div>
                <div style={{ marginBottom: 16 }}>Based In Tokyo.</div>
                <div style={{ marginBottom: 16 }}>---</div>
                <div style={{ marginBottom: 16 }}>Contact</div>
                <div style={{ marginBottom: 16 }}>sugimotoshinji11@gmail.com</div>
                <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link href={'https://www.instagram.com/shinjisugimoto84/?igshid=1eh2ijp64yeun'} passHref>
                        <img src="/insta.png" style={{ width: 30, height: 30, cursor: "pointer" }} alt="insta"/>
                    </Link>
                    <div>Instagram</div>
                </div>
                <div style={{ marginBottom: 16 }}>---</div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", margin: "auto 24px", width: "80vw" }}>
                {posts && posts.sort((a, b) => a.num - b.num).map((post, i) => (
                    <img key={i} style={{ maxHeight: 290, margin: "0 8px 12px 8px", cursor: "pointer" }} src={post.url} onClick={() => openPhoto(post)} alt={post.title} />
                ))}
                </div>
            </div>
            <Dialog
                open={!!selectedPhoto}
                onClose={() => openPhoto(null)}
                PaperProps={{ style:{ padding: 4 } }}>
                <DialogContent style={{ padding: 0, overflowY: "hidden" }}>
                    <img src={selectedPhoto && selectedPhoto.url} style={{ overflow: "hidden" }} onClick={() => openPhoto(null)} alt={selectedPhoto && selectedPhoto.title} />
                </DialogContent>
            </Dialog>
        </div>

    );
}
export default Index;
