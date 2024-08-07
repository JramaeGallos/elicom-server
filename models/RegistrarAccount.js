module.exports = (sequelize, DataTypes) => {

    const RegistrarAccount = sequelize.define("RegistrarAccount", {
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

    RegistrarAccount.associate = (models)=>{
        RegistrarAccount.hasMany(models.RegistrarRemark, {
            onDelete: "cascade",
        });
    };
    return RegistrarAccount;
}