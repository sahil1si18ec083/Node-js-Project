const { listModal } = require("../models/List");
const { userModal } = require("../models/User");

const createList = async (req, res) => {

  const {  responseCodes, name } = req.body;
const userId = req?.userId;
  if (!name || !responseCodes || !userId) {
    return res
      .status(400)
      .json({ error: " name, and responseCodes are required." });
  }

  try {
    console.log("hel");
    const newList = new listModal({
      userId: userId,
      name: name,
      responseCodes: responseCodes,
    });

    await newList.save();
    console.log({ newList });
    res
      .status(201)
      .json({ message: "List created successfully.", id: newList._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
const updateList = async (req, res) => {
  console.log("................................");
  const listId = req?.params?.listId;
  if (!listId) {
    return res.status(400).json({ message: "List Id cannot be empty" });
  }
  const userId = req?.userId;
  const { responseCodes, name } = req.body;

  if (!name || !responseCodes || !userId) {
    return res
      .status(400)
      .json({ error: " name, and responseCodes are required." });
  }

  try {
    console.log({ listId });
    const fulllist = await userModal.find({});
    console.log(fulllist);
    const updatedList = await listModal.findByIdAndUpdate(
      listId,
      {
        userId: userId,
        name: name,
        responseCodes: responseCodes,
      },
      {
        new: true,
      }
    );
    console.log({ updatedList });
    if (!updatedList) {
      return res.status(404).json({ error: "List not found." });
    }

    res
      .status(200)
      .json({ message: "List updated successfully.", list: updatedList });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};
const deleteList = async (req, res) => {
    console.log("delete api")
  const { listId } = req.params;



  if (!listId) {
    return res.status(400).json({ error: "List ID is required." });
  }

  try {
    const deletedList = await listModal.findByIdAndDelete(listId);

    if (!deletedList) {
      return res.status(404).json({ error: "List not found." });
    }

    res.status(200).json({ message: "List deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
const getList = async (req, res) => {
  console.log(req.body);
  const userId = req?.userId;
  console.log({userId})
  try {
    const data = await listModal.find({ userId: userId });
    console.log({ data });
    if (!data) {
      res.status(500).json({ error: "Internal server error." });
    }
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
const getListByListId = async (req, res) => {
  const listId = req?.params?.listId;
  if (!listId) {
    return res.status(400).json({ message: "List Id cannot be empty" });
  }

  try {
    const updatedList = await listModal.findById(listId);
    console.log({ updatedList });
    if (!updatedList) {
      return res.status(404).json({ data: updatedList });
    }

    res.status(200).json({ list: updatedList });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};
module.exports = {
  createList,
  updateList,
  deleteList,
  getList,
  getListByListId,
};
