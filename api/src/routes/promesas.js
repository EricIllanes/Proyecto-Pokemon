router.get("/pokemonsid/:id", (req, res, next) => {
    const { id } = req.params
    let detailcard
    if (typeof id === "string" && id.length > 8) {

        Pokemons.findByPk(id, {
            include: [{
                model: Types,
                attributes: ["name"],
            }]
        })
            .then((details) => {
                detailcard = {
                    id: details.id,
                    name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
                    image: details.image,
                    life: details.life,
                    strength: details.strength,
                    defense: details.defense,
                    speed: details.speed,
                    height: details.height,
                    weight: details.weight,
                    types: details.types.map(e => e.name),
                }
            }).then(() => res.send(detailcard))
            .catch((error) => {
                next(error)
            })
    } else {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((details) => {
                detailcard = {
                    id: details.data.id,
                    name: details.data.forms[0].name.charAt(0).toUpperCase() +
                        details.data.forms[0].name.slice(1),
                    image: details.data.sprites.other.home.front_default,
                    types: (details.data.types.map(e => e.type.name) ? // agregar un recorrido
                        details.data.types.map(e => e.type.name) :
                        "Sin tipos relacionados"),
                    life: details.data.stats[0].base_stat,
                    strength: details.data.stats[1].base_stat,
                    defense: details.data.stats[2].base_stat,
                    speed: details.data.stats[5].base_stat,
                    height: details.data.height,
                    weight: details.data.weight,

                }
            }).then(() => res.send(detailcard))
            .catch((error) => {
                next(error)
            })
    }
})

router.post("/pokemonscreate", (req, res, next) => {
    const { image, name, life, strength, defense, speed, weight, height, types } = req.body

    Pokemons.findOne({
        where: {
            name: name
        }
    }).then((response) => {
        if (response) {
            return res.send({ msg: "Este Pokémon ya existe" })
        } else {
            Pokemons.create({
                image, name, life, strength, defense, speed, weight, height, types
            }).then((pokemons) => {
                Types.findAll({
                    where: {
                        name: types
                    }
                })
                    .then((types) => {
                        types.forEach(e =>
                            pokemons.addType(e.id)
                        )
                    })
                    .then(() => res.send(pokemons))
            }).catch((error) => console.log(error))

        }
    }).catch((error) => console.log(error))
})

router.get("/pokemons", (req, res, next) => {

    const { name } = req.query
    let pokeResult = []

    Pokemons.findOne({
        where: {
            name: name
        },
        include: [{
            model: Types,
            attributes: ["name"]
        }]
    })
        .then((response) => {
            pokeResult.push({
                id: response[0].id,
                name: response[0].name.charAt(0).toUpperCase() + response[0].name.slice(1),
                image: response[0].image,
                types: response[0].types.map(e => e.name)
            })
        })
        .then(() => {
            if (pokeResult.length > 0) {
                res.send(pokeResult)
            } else {
                axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
                    .then((response) => {
                        pokeResult.push({
                            id: response.data.id,
                            name: response.data.forms[0].name.charAt(0).toUpperCase()
                                + response.data.forms[0].name.slice(1),
                            image: response.data.sprites.other.home.front_default,
                            types: response.data.types.map(e => e.type.name)
                        })
                    })
                    .then(() => res.send(pokeResult))
            }
        })
})