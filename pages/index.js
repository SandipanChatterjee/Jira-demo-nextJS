import App from "../components/App";
import { getProject } from "../components/services/Project";

// export const runtime = "experimental-edge"; // 'nodejs' (default) | 'experimental-edge'

export default function IndexPage({ project }) {
  return (
    <div>
      <App project={project} />
    </div>
  );
}

export const getStaticProps = async () => {
  const projectResponse = await getProject();
  const project = await projectResponse;
  return {
    props: {
      project: project.project,
    },
  };
};

// export const getServerSideProps = async ({ res }) => {
//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=1800, stale-while-revalidate=864000"
//   );
//   const projectResponse = await getProject();
//   const project = await projectResponse;
//   return {
//     props: {
//       project: project.project,
//     },
//   };
// };
