/* eslint-disable @next/next/no-css-tags */
import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const EditComponent = dynamic(() => import('../../components/Edit'), { ssr: false });

const Edit = () => {
  return (
    <>
      <Head>
        <link rel='stylesheet' href='assets/minimalist-blocks/content.css' />
        <link rel='stylesheet' href='box/box-flex.css' />
        <link rel='stylesheet' href='assets/scripts/navbar/navbar.css' />
      </Head>

      <EditComponent />
    </>
  );
};

export default Edit;
