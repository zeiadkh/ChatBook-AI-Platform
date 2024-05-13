import { summarize } from "../../utils/sum.js";

const summarizer = async (req, res, next) => {
  const { bId, sPg, ePg } = req.params;
  console.log("bId:", bId, "sPg:", sPg, "ePg:", ePg);
  let sum = await summarize(bId, sPg, ePg)
    .then((res) => res)
    .catch((err) => {return {error: err}});
  // console.log(sum, "from end point");
  return res.status(200).json({ success: true, sum });
};
export default summarizer;
