const Patients = require("../models/Patients");

module.exports = {
  listPatients: (req, res) => {
    Patients.find(function (err, data) {
      if (err) {
        return res.status(500).json({
          message: "Error getting Patients",
        });
      }

      return res.json(data);
    });
  },

  showPatients: (req, res) => {
    const { id } = req.params;

    Patients.findOne({ _id: id }, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: "Error getting Patients",
        });
      }
      if (!data) {
        return res.status(404).json({
          message: "Patients not found",
        });
      }
      return res.json(data);
    });
  },

  createPatients: async (req, res) => {
    const { fullName, age, gender, address, diagnosisDescription, diagnosisTime } = req.body;
    const files = req.files;

    if (
      fullName === undefined ||
      age === undefined ||
      gender === undefined ||
      address === undefined ||
      address === undefined ||
      diagnosisDescription === undefined ||
      diagnosisTime === undefined ||
      files === undefined
    ) {
      res.status(404).json({ message: "Please complete all the forms" });
    }

    const diagnosisImageUrlData = [];

    if (files) {
      files.map((file) => {
        diagnosisImageUrlData.push(file.url);
      });
    }

    const patientsData = new Patients({
      fullName,
      age,
      gender,
      address,
      diagnosis: {
        diagnosisDescription,
        diagnosisTime,
        diagnosisImageUrl: diagnosisImageUrlData,
      },
    });

    await patientsData.save(function (err, data) {
      if (err) {
        return res.status(500).json({
          message: "Error creating Patients",
        });
      }
      return res.json({
        message: "Patients Data has been created!",
        data,
      });
    });
  },

  updatePatients: async (req, res) => {
    const { id } = req.params;
    const { fullName, age, gender, address, diagnosisDescription, diagnosisTime } = req.body;
    const files = req.files;

    const diagnosisImageUrlData = [];

    if (files !== undefined) {
      files.map((file) => {
        diagnosisImageUrlData.push(file.url);
      });
    }

    Patients.findOne({ _id: id }, async function (err, data) {
      if (err) {
        return res.status(500).json({
          message: "Error getting Patients",
        });
      }
      if (!data) {
        return res.status(404).json({
          message: "Patients not found",
        });
      }

      data.fullName = fullName ? fullName : data.fullName;
      data.age = age ? age : data.age;
      data.gender = gender ? gender : data.gender;
      data.address = address ? address : data.address;
      data.diagnosis.diagnosisDescription = diagnosisDescription ? diagnosisDescription : data.diagnosisDescription;
      data.diagnosis.diagnosisTime = diagnosisTime ? diagnosisTime : data.diagnosisTime;
      data.diagnosis.diagnosisImageUrl =
        diagnosisImageUrlData !== [] && diagnosisImageUrlData.length ? diagnosisImageUrlData : data.diagnosisImageUrl;

      await data.save(function (err, data) {
        if (err) {
          return res.status(500).json({
            message: "Error updating Patients",
          });
        }
        return res.json({
          message: "Patients Data Updated!",
          data,
        });
      });
    });
  },

  deletePatients: (req, res) => {
    const { id } = req.params;
    Patients.findByIdAndRemove(id, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: "Error deleting Patients",
        });
      }
      return res.json({
        message: "Patients Data has been deleted",
      });
    });
  },
};
