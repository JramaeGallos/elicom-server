module.exports = (sequelize, DataTypes) => {

    const SectionList = sequelize.define("SectionList", {
        degreeCode:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        degreeDesc:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        specializationCode:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        specializationDesc:{
            type: DataTypes.STRING,
            allowNull: true, 
        },
        sectionCode:{
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
        },
        yearLevel:{
            type: DataTypes.STRING,
            allowNull: false, 
        }
    });

    SectionList.associate = (models)=>{
        SectionList.hasMany(models.StudentSection, {
            onDelete: "cascade",
        });

        SectionList.hasMany(models.InstructorSection, {
            onDelete: "cascade",
        });
    };

    return SectionList;
}