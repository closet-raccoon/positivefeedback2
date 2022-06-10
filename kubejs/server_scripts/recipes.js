onEvent('recipes', event => {
    event.shaped("thermal:press_gear_die", [
        " p ",
        "pgp",
        " p ",
    ],{p: "#forge:plates/iron",g: "#forge:gears"})
})