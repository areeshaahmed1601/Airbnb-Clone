import '../styles/globals.css'
import progressBar from '@badrap/bar-of-progress'
import Router from "next/router";

const progress=new progressBar({
  size:4,
  color:"#FE59FE",
  className:"z-50",
  delay:100,
});

Router.events.on('routeChangeStart',progress.start);
Router.events.on('routeChangeComplete',progress.finish);
Router.events.on('routeChangeError',progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
