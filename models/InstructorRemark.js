module.exports = (sequelize, DataTypes) => {

    const InstructorRemark = sequelize.define("InstructorRemark", {
        isClearedMT: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isClearedFinal: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        remark:{
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
        }
    });

    return InstructorRemark;
}