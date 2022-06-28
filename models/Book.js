module.exports = (sequelize, DataTypes) => {
    const Book  = sequelize.define("Book", {
        Author:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        Title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        Description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        Subject:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        PublicationYear:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        
    });

    return Book;
}