///RUTA EN ASYNC AWAIT

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


//RUTA EN PROMESA
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
