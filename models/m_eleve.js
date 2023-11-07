/** Import module */
const { DataTypes } = require('sequelize')

/** Modèle Formation */
module.exports = (sequelize) => {
    const Eleve = sequelize.define('Eleve', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_formation: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        firstname:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            validate:{
                isEmail: true        // Ici une validation de données
            }
        },
        password:{
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i    // Ici une contrainte
        }
    })

    return Eleve
}