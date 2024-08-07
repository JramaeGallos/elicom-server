module.exports = (sequelize, DataTypes) => {

    const RegistrarRemark = sequelize.define("RegistrarRemark", {
        remark:{
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
        }
    });

    return RegistrarRemark;
}