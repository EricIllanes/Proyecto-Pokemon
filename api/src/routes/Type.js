require("dotenv").config()
const { Router } = require("express")
const { Types, Pokemons } = require("../db")
const axios = require("axios")

const router = Router()

router.get("/types", async (req, res, next) => {
    try {
        let typesApiInfo = await axios.get(`https://pokeapi.co/api/v2/type`)
        let typeName = {
            name: typesApiInfo.data.results.map((e) => e.name)
        }
        typeName.name.forEach(elemento => {
            Types.findOrCreate({
                where: {
                    name: elemento
                }
            })
        })

        const allTypes = await Types.findAll()
        res.send(allTypes)

    } catch (error) {
        next(error)
    }
})

router.post("/typescrete", async (req, res, next) => {

    try {
        const { name } = req.body

        let newType = Types.create({
            name
        })

        res.send(newType)

    } catch (error) {
        next(error)
    }
})
module.exports = router