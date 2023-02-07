import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello Home</h1>

      <button type='button' onClick={() => (window.location.href = '/edit')}>
        edit
      </button>
    </div>
  );
};

export default Home;
