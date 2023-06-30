import App from "../components/App";
import { createGuestAccount } from "../components/services/GuestAccount";
import { getProject } from "../components/services/Project";

export default function IndexPage({ authToken, project }) {
  return (
    <div>
      <App authToken={authToken} project={project} />
    </div>
  );
}

export const getStaticProps = async () => {
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
