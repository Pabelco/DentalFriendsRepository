module.exports = {
    HOST: "64.225.52.26",
    USER: "super_admin",
    PASSWORD: "DientesBlancos_2020",
    DB: "dental_friends",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };