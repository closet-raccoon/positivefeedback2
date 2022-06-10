// priority: 0
onEvent('item.registry', event => {
	// Register new items here
	// event.create('example_item').displayName('Example Item')
})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

onEvent('tags.items', event => {
    event.add('forge:crops/vanillabean', 'croptopia:vanilla')
    event.add('forge:crops/sweat_berries','minecraft:sweet_berries')
    event.add('forge:fruits',/forge\/fruits\/\b.{1,}/)

})


onEvent("worldgen.remove", event => {

	
	event.removeOres(ores => {
		ores.blocks = [
			"ftbic:aluminum_ore",
			"ftbic:deepslate_aluminum_ore",
			"ftbic:deepslate_iridium_ore",
			"ftbic:deepslate_lead_ore",
			"ftbic:deepslate_tin_ore",
			"ftbic:deepslate_uranium_ore",
			"ftbic:iridium_ore",
			"ftbic:lead_ore",
			"ftbic:tin_ore",
			"ftbic:uranium_ore",
		]
	})

	event.removeFeatureById("underground_ores", [
		"thermal:apatite_ore",
		"thermal:cinnabar_ore",
		"thermal:lead_ore",
		"thermal:nickel_ore",
		"thermal:niter_ore",
		"thermal:silver_ore",
		"thermal:sulfur_ore",
		"thermal:tin_ore",
	]);
})
