module.exports = (sequelize, DataTypes) => {

    const ClearanceSignRemark = sequelize.define("ClearanceSignRemark", {
        isClearedRecord: {
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

    return ClearanceSignRemark;
}