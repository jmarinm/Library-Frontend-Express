module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define("Loan", {
        Date:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
    });
    return Loan;
}