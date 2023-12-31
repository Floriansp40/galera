/** Import module */
const { DataTypes } = require('sequelize')

/** Modèle Formation */
module.exports = (sequelize) => {
    const Note = sequelize.define('Note', {
        id_formateur: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        id_eleve: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        value:{
            type: DataTypes.INTEGER(2),
            defaultValue: 0,
            allowNull: false
        },
        comment:{
            type: DataTypes.STRING(250),
            defaultValue: '',
            allowNull: false
        },
        module_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        }
    })

    return Note
}