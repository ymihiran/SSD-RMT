import DocumentEvaluation from "../models/DocumentEvaluation.js";

//insert data
export const EvaluateDoc = async (req, res) => {
  try {
    const { groupID, Doctype, researchTopic, total, evaluatedBy } = req.body;
    const newDocumentEvaluation = new DocumentEvaluation({
      groupID,
      Doctype,
      researchTopic,
      total,
      evaluatedBy,
    });

    await newDocumentEvaluation.save().then(() => {
      res.json(newDocumentEvaluation);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
