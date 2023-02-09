import React, { useEffect, useState } from 'react';
interface previewData {
  html: string;
  mainCss: string;
  sectionCss: string;
}

const scripts = [
  'assets/scripts/glide/glide.min.js',
  'assets/scripts/navbar/navbar.min.js',
  'box/box-flex.js',
  'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js',
];

const EditComponent = () => {
  // for make a POST request to server
  const [data, setData] = useState<previewData>({ html: '', mainCss: '', sectionCss: '' });

  const receiveMessage = (event: MessageEvent<any>) => {
    if (!event.data.hasOwnProperty('html')) return;

    document.head.insertAdjacentHTML('beforeend', event.data.mainCss);
    document.head.insertAdjacentHTML('beforeend', event.data.sectionCss);

    scriptInjection();
    domInjection(event.data);

    setData({
      html: event.data.html,
      mainCss: event.data.mainCss,
      sectionCss: event.data.sectionCss,
    });
  };

  const domInjection = (data: previewData) => {
    if (typeof data.html !== 'string')
      return alert('Can not make a preview! Save the contents first');

    const wrapper = document.querySelector('.is-wrapper');
    if (!wrapper) return alert('There is no wrapper element');
    wrapper.innerHTML = '';
    const range = document.createRange();
    range.setStart(wrapper, 0);
    wrapper.appendChild(range.createContextualFragment(data.html));
  };

  const scriptInjection = () => {
    for (let eachScript of scripts) {
      const script = document.createElement('script');
      script.src = eachScript;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  };

  const doSomething = () => {
    // path or information about each article
    const MAGAZINE = 'junhee/1';

    const iframe = document.querySelector('.wrapper-iframe') as HTMLIFrameElement;
    if (!iframe) return alert('Can not find iframe');
    if (!iframe.contentWindow) return alert('Can not find iframe.contentWindow');

    console.log('message to iframe!');

    iframe.contentWindow.postMessage(MAGAZINE, '*');
  };

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);

    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, []);

  return (
    <div>
      <button type='button' onClick={() => (window.location.href = '/')}>
        home
      </button>
      <button type='button' onClick={doSomething}>
        message
      </button>

      <h1>Editor</h1>
      <iframe
        className='wrapper-iframe'
        src='http://localhost:3001/edit'
        style={{
          margin: 0,
          border: '2px solid',
          width: '100%',
          height: '80vh',
          boxSizing: 'border-box',
        }}
      />

      <h1>Rendering View</h1>
      <div
        style={{
          margin: 0,
          border: '2px solid',
          width: '100%',
          height: '80vh',
          boxSizing: 'border-box',
        }}
      >
        <div className='is-wrapper'></div>
      </div>
    </div>
  );
};

export default EditComponent;
