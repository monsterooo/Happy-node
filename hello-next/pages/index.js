import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/tv/[id]" as={`/tv/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

// const PostLink = props => (
//   <li>
//     <Link href="/p/[id]" as={`/p/${props.id}`}>
//       <a>{props.id}</a>
//     </Link>
//     <style jsx>{`
//       li {
//         list-style: none;
//         margin: 5px 0;
//       }

//       a {
//         text-decoration: none;
//         color: blue;
//         font-family: 'Arial';
//       }

//       a:hover {
//         opacity: 0.6;
//       }
//     `}</style>
//   </li>
// )

// const Index = () => (
//   <Layout>
//     <h1>My Blogs</h1>
//     <a>abc</a>
//     <ul>
//       <PostLink id="hello-nextjs" />
//       <PostLink id="learn-nextjs" />
//       <PostLink id="deploy-nextjs" />
//     </ul>
//     <style jsx>{`
//         h1,
//         a {
//           font-family: 'Arial';
//         }

//         ul {
//           padding: 0;
//         }

//         li {
//           list-style: none;
//           margin: 5px 0;
//         }

//         a {
//           text-decoration: none;
//           color: blue;
//         }

//         a:hover {
//           opacity: 0.6;
//         }
//       `}</style>
//   </Layout>
// );

export default Index;