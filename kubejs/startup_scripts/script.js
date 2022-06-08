// priority: 0
onEvent('item.registry', event => {
	// Register new items here
	// event.create('example_item').displayName('Example Item')
})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

onEvent("worldgen.remove", (event) => {

	event.removeOres(ores => {
		ores.blocks = [
			"alltheores:aluminum_end_ore",
			"alltheores:aluminum_nether_ore",
			"alltheores:iridium_end_ore",
			"alltheores:iridium_nether_ore",
			"alltheores:lead_end_ore",
			"alltheores:lead_nether_ore",
			"alltheores:nickel_end_ore",
			"alltheores:nickel_nether_ore",
			"alltheores:osmium_end_ore",
			"alltheores:osmium_nether_ore",
			"alltheores:peridot_ore",
			"alltheores:peridot_slate_ore",
			"alltheores:platinum_end_ore",
			"alltheores:platinum_nether_ore",
			"alltheores:ruby_ore",
			"alltheores:ruby_slate_ore",
			"alltheores:sapphire_ore",
			"alltheores:sapphire_slate_ore",
			"alltheores:silver_end_ore",
			"alltheores:silver_nether_ore",
			"alltheores:tin_end_ore",
			"alltheores:tin_nether_ore",
			"alltheores:uranium_nether_ore",
			"alltheores:zinc_end_ore",
			"alltheores:zinc_nether_ore",
			"create:deepslate_zinc_ore",
			"create:zinc_ore",
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
			"immersiveengineering:deepslate_ore_nickel",
			"immersiveengineering:deepslate_ore_silver",
			"immersiveengineering:ore_nickel",
			"immersiveengineering:ore_silver",
			"mekanism:osmium_ore",
			"mekanism:deepslate_osmium_ore",
		]
	})

	event.removeFeatureById("underground_ores", [
		"mekanism:ore_fluorite_buried",
		"mekanism:ore_fluorite_normal",
		"mekanism:ore_lead_normal",
		"mekanism:ore_lead_normal",
		"mekanism:ore_osmium_middle",
		"mekanism:ore_osmium_small",
		"mekanism:ore_osmium_upper",
		"mekanism:ore_tin_large",
		"mekanism:ore_tin_large",
		"mekanism:ore_tin_small",
		"mekanism:ore_tin_small",
		"mekanism:ore_uranium_buried",
		"mekanism:ore_uranium_buried",
		"mekanism:ore_uranium_small",
		"mekanism:ore_uranium_small",
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
