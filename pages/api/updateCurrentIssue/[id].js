import { updateIssueList } from "../../../components/services/updateIssueList";

export default async function handler(req, res) {
  console.log("request#", req);
  try {
    const response = await updateIssueList(payload, id);
    const data = await response;
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
