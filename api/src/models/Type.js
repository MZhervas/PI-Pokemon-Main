const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        len:{
        args:[0,20],
        msg:"El nombre debe contener entre 0 y 20 caracteres"}
      },
    },
  },{timestamps: false, freezeTableName:true});
};