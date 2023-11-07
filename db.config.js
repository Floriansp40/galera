/** Import module */
const { Sequelize } = require('sequelize')

/** Connexion à la base de donnée */

let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)

/** Mise en place des modèles et relation */
const db = {}

db.sequelize = sequelize
db.Formation = require('./models/m_formation')(sequelize)
db.Formateur = require('./models/m_formateur')(sequelize)
db.Eleve = require('./models/m_eleve')(sequelize)
db.Module = require('./models/m_module')(sequelize)
db.Note = require('./models/m_note')(sequelize)

db.Formation.hasMany(db.Eleve, {foreignKey: 'id_formation'})
db.Eleve.belongsTo(db.Formation, {foreignKey: 'id_formation'})

/** Synchronisation des modèles */
db.sequelize.sync({alter: true})

module.exports = db