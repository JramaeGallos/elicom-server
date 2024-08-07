module.exports = (sequelize, DataTypes) => {

    const SystemManagement = sequelize.define("SystemManagement", {
        isOpenEnrollment:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false, 
        },
        isOpenTransaction:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    });
    
    return SystemManagement;
}