import { useRouter } from "next/router";
import { getCurrentIssue } from "../../../components/actions/issues";
import { getIssue } from "../../../components/services/getCurrentIssue";
import { getProject } from "../../../components/services/Project";
import MasterIssue from "../../../components/components/dashboard/issue/MasterIssue";
import MasterIssueModal from "../../../components/components/dashboard/issueModal/MasterIssueModal";

export default function Issue({ currentIssue }) {
  return <MasterIssueModal currentIssue={currentIssue} />;
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const currentIssueResponse = await getIssue(id);
  const currentIssue = await currentIssueResponse;
  return {
    props: {
      currentIssue: currentIssue.issue,
    },
  };
};

// export const getStaticPaths = async () => {
//   const projectResponse = await getProject();
//   const project = await projectResponse;
//   const paths = project.project.issues.map((issue) => ({
//     params: { id: issue.id.toString() },
//   }));
//   return { paths, fallback: false };
// };

// export const getStaticProps = async ({ params }) => {
//   const currentIssueResponse = await getIssue(params.id);
//   const currentIssue = await currentIssueResponse;
//   return {
//     props: {
//       currentIssue: currentIssue.issue,
//     },
//   };
// };
