module.exports = (sequelize, DataTypes) => {

    const InstructorAccount = sequelize.define("InstructorAccount", {
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

    InstructorAccount.associate = (models)=>{
        InstructorAccount.hasOne(models.InstructorSection, {
            onDelete: "cascade",
        });

        InstructorAccount.hasMany(models.InstructorRemark, {
            onDelete: "cascade",
        });
    };
    return InstructorAccount;
}