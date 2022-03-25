const express = require("express");
const Event = require("../models/Event");

const createEvent = async (req = express.request, res = express.response) => {
  try {
    const { uid, name } = req;

    const event = new Event(req.body);

    event.userRef = uid;
    (event.createBy = name), await event.save();

    return res.status(200).json({
      ok: true,
      msg: "Evento creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

const updateEvent = async (req = express.request, res = express.response) => {
  try {
    const { uid } = req;

    const newEvent = {
      title: "",
      bgColor: "",
      startDate: "",
      endDate: "",
      notes: "",
    };
    const { title, bgColor, startDate, endDate, notes, id } = req.body;
    if (title) {
      newEvent.title = title;
    }

    if (bgColor) {
      newEvent.bgColor = bgColor;
    }

    if (startDate) {
      newEvent.startDate = startDate;
    }
    if (endDate) {
      newEvent.endDate = endDate;
    }

    if (notes) {
      newEvent.notes = notes;
    }

    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (event.userRef.toString() !== uid) {
      return res.status(401).json({ ok: false, msg: "No Autorizado" });
    }

    event = await Event.findByIdAndUpdate(
      { _id: id },
      { $set: newEvent },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      msg: "El evento se actualizo correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

const getEvents = async (req = express.request, res = express.response) => {
  try {
    const { uid } = req;

    const events = await Event.find({ userRef: uid, active: true });
    console.log('events');
    res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

const deleteEvent = async (req = express.request, res = express.response) => {
  try {
    const { uid } = req;
    const { id } = req.body;

    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (event.userRef.toString() !== uid) {
      return res.status(401).json({ ok: false, msg: "No Autorizado" });
    }

    event = await Event.findByIdAndUpdate(
      { _id: id },
      { active: false },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getEvents,
  deleteEvent,
};
