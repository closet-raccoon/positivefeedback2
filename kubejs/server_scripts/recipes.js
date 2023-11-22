onEvent('recipes', event => {
    event.shaped("thermal:press_gear_die", [
        " p ",
        "pgp",
        " p ",
    ],{p: "#forge:plates/iron",g: "#forge:gears"})

    event.shaped("ae2:pattern_provider", [
        " t ",
        " i ",
        " t ",
    ],{i: "ae2:interface",t: "#forge:workbenches"})

    event.shaped("ae2:interface", [
        " g ",
        " i ",
        " g ",
    ],{i: "ae2:pattern_provider", g: "#forge:glass"})
    
})