module.exports = (sequelize, DataTypes) => {

    const StudentAccount = sequelize.define("StudentAccount", {
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
        studentNumber:{
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
        isNewStudent: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        isRegular: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        isClearRecordInst: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isClearRecordClear: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isPreregistered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isEnrolled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        hasSection: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },

        //pre-registration form values
        //student information
        middleName:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        sex:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        birthDate:{
            type: DataTypes.DATEONLY,
            allowNull: true, 
        },
        birthPlace:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        civilStatus:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        contactNumber:{
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        temporaryAddress:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        permanentAddress:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        //academic information
        lrn:{
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        yearLevel:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        course:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        specialization:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        subjects:{
            type: DataTypes.STRING,
            allowNull: true
        },
        //mother's name
        motherName:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        motherOccupation:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        //father'name
        fatherName:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        fatherOccupation:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        //guardian information
        guardianName:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        guardianRelationship:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        guardianAddress:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        guardianContact:{
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        annualIncome:{
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
    });

    StudentAccount.associate = (models)=>{
        StudentAccount.hasOne(models.StudentSection, {
            onDelete: "cascade",
        });
        
        StudentAccount.hasMany(models.InstructorRemark, {
            onDelete: "cascade",
        });

        StudentAccount.hasMany(models.ClearanceSignRemark, {
            onDelete: "cascade",
        });

        StudentAccount.hasMany(models.RegistrarRemark, {
            onDelete: "cascade",
        });
    };

    return StudentAccount;
}
