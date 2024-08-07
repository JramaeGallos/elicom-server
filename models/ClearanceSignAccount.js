module.exports = (sequelize, DataTypes) => {

    const ClearanceSignAccount = sequelize.define("ClearanceSignAccount", {
        firstName:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        employeeNumber:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            unique: true
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                isEmail: true 
            }
        },
        verificationToken:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        isVerified:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    ClearanceSignAccount.associate = (models)=>{
        ClearanceSignAccount.hasMany(models.ClearanceSignRemark, {
            onDelete: "cascade",
        });
    };

    return ClearanceSignAccount;
}