import { summarize } from "../../utils/sum.js";

const summarizer = async (req, res, next) => {
  const { bId, sPg, ePg } = req.params;
  console.log("bId:", bId, "sPg:", sPg, "ePg:", ePg);
  
  try {
    const sum = await summarize(bId, sPg, ePg);
    console.log(sum)
    if (!sum.error) {
      return res.status(200).json({
        success: true,
        sum
      });
    }
    
    return res.status(400).json({
      success: false,
      error: sum.error
    })
    
  } catch (err) {
    return next(new Error(err))
   
  }
};

export default summarizer;
