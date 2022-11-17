require("dotenv").config()
const { Router } = require("express")
const { Types, Pokemons } = require("../db")
const axios = require("axios")
const { Op } = require("sequelize")

const router = Router()

router.get("/pokemonsid/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        if (typeof id === "string" && id.length > 8) {
            let pokemonsdetail = await Pokemons.findByPk(id, {
                include: [{
                    model: Types,
                    attributes: ["name"]
                }]
            })
            let detailcard = {
                id: pokemonsdetail.id,
                name: pokemonsdetail.name.charAt(0).toUpperCase() + pokemonsdetail.name.slice(1),
                image: pokemonsdetail.image,
                types: pokemonsdetail.types.map(e => e.name),
                strength: pokemonsdetail.strength,
                life: pokemonsdetail.life,
                defense: pokemonsdetail.defense,
                speed: pokemonsdetail.speed,
                height: pokemonsdetail.height,
                weight: pokemonsdetail.weight,
            }
            res.send(detailcard)
        } else {
            pokemonsdetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            detailcard = {
                id: pokemonsdetail.data.id,
                name: pokemonsdetail.data.forms[0].name.charAt(0).toUpperCase() +
                    pokemonsdetail.data.forms[0].name.slice(1),
                image: pokemonsdetail.data.sprites.other.home.front_default,
                types: (pokemonsdetail.data.types.map(e => e.type.name) ? // agregar un recorrido
                    pokemonsdetail.data.types.map(e => e.type.name) :
                    "Sin tipos relacionados"),
                strength: pokemonsdetail.data.stats[1].base_stat,
                life: pokemonsdetail.data.stats[0].base_stat,
                defense: pokemonsdetail.data.stats[2].base_stat,
                speed: pokemonsdetail.data.stats[5].base_stat,
                height: pokemonsdetail.data.height,
                weight: pokemonsdetail.data.weight,

            }
            res.send(detailcard)
        }

    } catch (error) {
        next(error)
    }
})


router.post("/pokemonscreate", async (req, res, next) => {
    try {
        const {
            image, name, life, strength, defense, speed, weight, height, types
        } = req.body
        let typess = await Types.findAll({
            where: {
                name: types
            }
        })
        let newPokemon = await Pokemons.findOne({
            where: {
                name: name,
            },
        })
        if (newPokemon) {
            res.send({ msg: "Este Pokémon ya existe" })
        } else {
            newPokemon = await Pokemons.create({
                image, name, life, strength, defense, speed, weight, height, types
            })
            typess.forEach(async (e) => {
                await newPokemon.addType(e.id)
            })
            res.send(newPokemon)
        }
    } catch (error) {
        next(error)
    }
})

router.get("/pokemons", async (req, res, next) => {
    try {
        const { name } = req.query
        const pokeDB = await Pokemons.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                },
            },
            include: [{
                model: Types,
                attributes: ["name"]
            }],
            order: [["name", "ASC"]]
        })
        if (pokeDB.length === 0) {
            const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
            const filteredPokemon = [{
                id: pokeAPI.data.id,
                name: pokeAPI.data.forms[0].name.charAt(0).toUpperCase()
                    + pokeAPI.data.forms[0].name.slice(1),
                image: pokeAPI.data.sprites.other.home.front_default,
                types: pokeAPI.data.types.map(e => e.type.name)

            }]
            res.json(filteredPokemon)
        } else {
            const pokeDBresult = [{
                id: pokeDB[0].id,
                name: pokeDB[0].name.charAt(0).toUpperCase() + pokeDB[0].name.slice(1),
                image: pokeDB[0].image,
                types: pokeDB[0].types.map(e => e.name)
            }]
            res.json(pokeDBresult)

        }
    } catch (error) {
        res.send([])
    }
})

router.get("/pokemonsrandom", async (req, res, next) => {
    try {
        //debo crear un array 
        let random = []
        let pokemonsrandom = []
        let probandingDB = []

        const genNum = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min
        }
        for (let i = 0; i < 40; i++) {
            random.push(genNum(40, 860))
        }
        let pokeDBS = await Pokemons.findAll({
            include:
                [{
                    model: Types,
                    attributes: ["name"],
                }]
        })
        for (let i = 0; i < pokeDBS.length; i++) {
            probandingDB.push({
                id: pokeDBS[i].id,
                name: pokeDBS[i].name.charAt(0).toUpperCase() + pokeDBS[i].name.slice(1),
                image: pokeDBS[i].image,
                strength: pokeDBS[i].strength,
                types: pokeDBS[i].types.map(e => e.name)
            })
        }


        for (let x = 0; x < random.length; x++) {
            let pokeCall = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random[x]}`)
            pokemonsrandom.push({
                id: pokeCall.data.id,
                name: pokeCall.data.forms[0].name.charAt(0).toUpperCase() + pokeCall.data.forms[0].name.slice(1),
                image: pokeCall.data.sprites.other.home.front_default,
                strength: pokeCall.data.stats[1].base_stat,
                types: pokeCall.data.types.map(e => e.type.name)
            })
        }
        let allRandomPoke = [...pokemonsrandom, ...probandingDB]
        res.send(allRandomPoke)

    } catch (error) {
        next(error)
    }
})

router.get("/pokemonshome", async (req, res, next) => {
    try {
        // let probanding = []
        // let probandingDB = []
        // let n = 1
        // let pokeDBS = await Pokemons.findAll({
        //     include:
        //         [{
        //             model: Types,
        //             attributes: ["name"],
        //         }]

        // })
        // for (let i = 0; i < pokeDBS.length; i++) {
        //     probandingDB.push({
        //         id: pokeDBS[i].id,
        //         name: pokeDBS[i].name.charAt(0).toUpperCase() + pokeDBS[i].name.slice(1),
        //         image: pokeDBS[i].image,
        //         types: pokeDBS[i].types.map(e => e.name),
        //         strength: pokeDBS[i].strength,
        //         life: pokeDBS[i].life,
        //         defense: pokeDBS[i].defense,
        //         speed: pokeDBS[i].speed,
        //         height: pokeDBS[i].height,
        //         weight: pokeDBS[i].weight,

        //     })
        // }

        // while (n < 41) {
        //     let pokeDetailHome = await axios.get(`https://pokeapi.co/api/v2/pokemon/${n}/`)
        //     probanding.push({
        //         id: pokeDetailHome.data.id,
        //         name: pokeDetailHome.data.forms[0].name.charAt(0).toUpperCase() + pokeDetailHome.data.forms[0].name.slice(1),
        //         image: pokeDetailHome.data.sprites.other.home.front_default,
        //         types: pokeDetailHome.data.types.map(e => e.type.name),
        //         strength: pokeDetailHome.data.stats[1].base_stat,
        //         life: pokeDetailHome.data.stats[0].base_stat,
        //         defense: pokeDetailHome.data.stats[2].base_stat,
        //         speed: pokeDetailHome.data.stats[5].base_stat,
        //         height: pokeDetailHome.data.height,
        //         weight: pokeDetailHome.data.weight,
        //         experience: pokeDetailHome.data.base_experience
        //     })
        //     n++
        // }
        // let allPokeHome = [...probandingDB, ...probanding]
        // res.send(allPokeHome)
        //debo crear un array 
        let random = []
        let pokemonsrandom = []
        let probandingDB = []

        const genNum = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min
        }
        for (let i = 0; i < 40; i++) {
            random.push(genNum(40, 860))
        }
        let pokeDBS = await Pokemons.findAll({
            include:
                [{
                    model: Types,
                    attributes: ["name"],
                }]
        })
        for (let i = 0; i < pokeDBS.length; i++) {
            probandingDB.push({
                id: pokeDBS[i].id,
                name: pokeDBS[i].name.charAt(0).toUpperCase() + pokeDBS[i].name.slice(1),
                image: pokeDBS[i].image,
                strength: pokeDBS[i].strength,
                types: pokeDBS[i].types.map(e => e.name)
            })
        }


        for (let x = 0; x < random.length; x++) {
            let pokeCall = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random[x]}`)
            pokemonsrandom.push({
                id: pokeCall.data.id,
                name: pokeCall.data.forms[0].name.charAt(0).toUpperCase() + pokeCall.data.forms[0].name.slice(1),
                image: pokeCall.data.sprites.other.home.front_default,
                strength: pokeCall.data.stats[1].base_stat,
                types: pokeCall.data.types.map(e => e.type.name)
            })
        }
        let allRandomPoke = [...pokemonsrandom, ...probandingDB]
        res.status(200).send(allRandomPoke)

    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "Internal server error" })
    }
})

module.exports = router
