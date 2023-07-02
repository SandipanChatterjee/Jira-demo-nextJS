import App from "../components/App";
import { createGuestAccount } from "../components/services/GuestAccount";
import { getProject } from "../components/services/Project";

export const runtime = "experimental-edge"; // 'nodejs' (default) | 'edge'

export default function IndexPage({ authToken, project }) {
  return (
    <div>
      <App authToken={authToken} project={project} />
    </div>
  );
}

export const getServerSideProps = async () => {
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=1800, stale-while-revalidate=864000"
  // );
  const guestAccountResponse = await createGuestAccount();
  let authToken = await guestAccountResponse;
  const projectResponse = await getProject();
  const project = await projectResponse;
  return {
    props: {
      authToken: authToken.data.authToken,
      project: project.project,
    },
  };
};

// export const getStaticProps = async () => {
//   const guestAccountResponse = await createGuestAccount();
//   let authToken = await guestAccountResponse;
//   const projectResponse = await getProject();
//   const project = await projectResponse;
//   return {
//     props: {
//       authToken: authToken.data.authToken,
//       project: project.project,
//     },
//   };
// };
