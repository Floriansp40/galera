/** Import des modules */
const DB = require('../db.config')
const Formation = DB.Formation

/**  */
exports.getAllFormations = (req, res) => {
    Formation.findAll()
        .then(formations => res.json({data: formations}))
        .catch(e => res.status(500).json({message: 'Database Error', error:e}))
}

exports.getFormation = async (req, res) => {
    let formationId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!formationId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération
        let formation = await Formation.findOne({ where: { id: formationId }})

        // Test si résultat
        if (formation === null) {
            return res.status(404).json({ message: 'This formation does not exist !' })
        }

        // Renvoi 
        return res.json({ data: formation })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addFormation = async (req, res) => {
    const { nom, debut, fin } = req.body

    // Validation des données reçues
    if (!nom || !debut || !fin) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification 
        let formation = await Formation.findOne({ where: { nom: nom }, raw: true })
        if (formation !== null) {
            return res.status(409).json({ message: `The formation ${nom} already exists !` })
        }

        // Céation 
        formation = await Formation.create(req.body)
        return res.json({ message: 'Formation Created', data: formation })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}