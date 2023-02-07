import React from 'react';
import dynamic from 'next/dynamic';
const EditComponent = dynamic(() => import('../../components/Edit'), { ssr: false });

const Edit = () => {
  return <EditComponent />;
};

export default Edit;
