const User = require("../models/user.model");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospital.model");
const fs = require("fs");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (collection, id, path, filename) => {
  switch (collection) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("no se encontro el medico");
        return false;
      }

      
      borrarImagen("./uploads/doctors/" + doctor.img);

      doctor.img = filename;
      await doctor.save();
      return true;

      break;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("no se encontro el hospital");
        return false;
      }

      borrarImagen("./uploads/hospitals/" + hospital.img);

      hospital.img = filename;
      await hospital.save();
      return true;

      break;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("no se encontro el usuario");
        return false;
      }

      borrarImagen("./uploads/users/" + user.img);

      user.img = filename;
      await user.save();
      return true;

      break;
  }
};

module.exports = {
  updateImage,
};
