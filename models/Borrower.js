module.exports = (sequelize, DataTypes) => {
    const Borrower  = sequelize.define("Borrower", {
        Name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        Adress:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        PostalCode:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        City:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        Email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        PhoneNumber:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
    });

    return Borrower;
}