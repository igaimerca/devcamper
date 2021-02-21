const Bootcamp = require("../models/Bootcamp");

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps })
  } catch (error) {
    res.status(400).json({ success: false })
  }
};

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    res.status(200).json({ success: true, data: bootcamp })
  } catch (error) {
    res.status(400).json({ success: false })
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
      success: true,
      data: bootcamp
    })
    
  } catch (error) {
    res.status(400).json({ 
      success: false
     })
  }
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ data: "Update bootcamp" });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ data: "Delete bootcamp" });
};
