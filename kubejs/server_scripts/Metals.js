/*
Credit:
    ClosetRedPanda: All code writen in file unless stated otherwise

    FTB Team: list of what to unify ↓ , with that said nothing below is taken directly from them and its all writen from by ↑
    copper, gold, iron, aluminum, bronze, constantan, electrum, enderium, invar, iridium, lead, nickel, osmium, silver, steel, tin, uranium, zinc

*/
// Please be pacient im a Lua dev.... someone needs to make Moon^2

settings.logErroringRecipes = false  //disables the errors when parsing already defined recipes, its just annoying and i have no plans to fix other mods issues
console.setDebugEnabled(false)       //enable this for 'fun' log spam and pretty much no useful information

onEvent('recipes', event => {
    let gearcenter = "minecraft:iron_ingot"
    const default_fill = "alltheores" //change this and fill to change what mod your using to fill the rest of the table.  
    
    //overrides and ect go here first then are processed later ↓
    //Note though that in the gen table function it using alltheores and default minecraft style item ids you might need to change that to your prefered mod or add overrides in the table manually
    let premetals = [
		{ name: "aluminum",     fill: "alltheores",},
		{ name: "bronze",       fill: "alltheores",},
		{ name: "constantan",   fill: "alltheores",},
		{ name: "copper",       fill: "alltheores",      ingot:"minecraft:copper_ingot",    ingotBlock:"minecraft:copper_block",    raw:"minecraft:raw_copper", rawBlock:"minecraft:raw_copper_block",  nugget:"alltheores:copper_nugget",},
		{ name: "electrum",     fill: "alltheores",},
		{ name: "enderium",     fill: "alltheores",},
		{ name: "gold",	        fill: "alltheores",      ingot:"minecraft:gold_ingot",      ingotBlock:"minecraft:gold_block",      raw:"minecraft:raw_gold",   rawBlock:"minecraft:raw_gold_block",    nugget:"minecraft:gold_nugget",   },
		{ name: "invar",        fill: "alltheores",},
		{ name: "iridium",      fill: "alltheores",},
		{ name: "iron",         fill: "alltheores",      ingot:"minecraft:iron_ingot",      ingotBlock:"minecraft:iron_block",      raw:"minecraft:raw_iron",   rawBlock:"minecraft:raw_iron_block",    nugget:"minecraft:iron_nugget",   },
		{ name: "lead",	        fill: "alltheores",},
		{ name: "nickel",       fill: "alltheores",},
		{ name: "osmium",       fill: "mekanism",       ingot:"mekanism:ingot_osmium", ingotBlock:"mekanism:block_osmium", dust: "mekanism:dust_osmium", rawBlock: "mekanism:block_raw_osmium", nugget: "mekanism:nugget_osmium",},
		{ name: "silver",       fill: "alltheores",},
		{ name: "steel",        fill: "alltheores",},	
		{ name: "tin",          fill: "alltheores",},
		{ name: "uranium",      fill: "alltheores",},
		{ name: "zinc",         fill: "alltheores",},
        { name: "brass",        fill: "alltheores",},
        { name: "enderium",     fill: "thermal",         rod: "alltheores:enderium_rod",},
        { name: "lumium",       fill: "thermal",         rod: "alltheores:lumium_rod",},
        { name: "netherite",    fill: "alltheores",      ingot:"minecraft:netherite_ingot", ingotBlock:"minecraft:netherite_block", raw:null,                   rawBlock:null,                          nugget:"createdeco:netherite_nugget", dust:"alltheores:netherite_dust", gear:"thermal:netherite_gear", },
        { name: "signalum",     fill: "thermal",         rod: "alltheores:signalum_rod",},
    ]
    console.info("Pre-table defined")

    //↓ filling the rest of the table above ↑
    function genTable(metals){
        console.info("Generating table")
        metals.forEach (metal =>{
            let g = metal.fill || default_fill
            let r = g+":"
            let n = metal.name

            //Lua style, if *nil then replace
            metal.ingot = metal.ingot           || r+n+"_ingot"  //Uses minecrafts/alltheores item id style you might need to change that
            metal.ingotBlock = metal.ingotBlock || r+n+"_block"
            metal.raw = metal.raw               || r+"raw_"+n
            metal.rawBlock = metal.rawBlock     || r+"raw_"+n+"_block"
            metal.nugget = metal.nugget         || r+n+"_nugget"
            metal.dust = metal.dust             || r+n+"_dust"
            metal.plate = metal.plate           || r+n+"_plate"
            metal.gear = metal.gear             || r+n+"_gear"
            metal.rod = metal.rod               || r+n+"_rod"

            console.info(n+': generated with replacement'+g)
        })

        //check if all items exsist, and if doesn't print to log and delete it
        console.info("checking items")
        metals.forEach (metal =>{                                   // Itterating through each metal in metals table
            let s = metal.name
            let d = metal.fill
            for(const [k,v] of Object.entries(metal)){              // Iterating through the individual items in the metal's table.
                if (!(v == s || v == d)){                           //skipping predefined non-items i miss "for in pairs"
                    if (Item.exists(v) == false) {
                        console.warn(v+": Doesnt exsist!  Removing from table. 'doesnt have' warns may appear, thats totally fine!")
                        metal[k] = null
                    }else{
                        //console.info(v+": Does exsist!")
                    }
                }
            }
        })
        return metals
    }
    
    //Actuall unification done here pass the table above (and returned by gentable function) ↑↑ as arg 

    //name, ingot, ingotBlock, raw, rawBlock, nugget, dust, plate, gear, rod,
    function unify(metals){         // You'll need to change this if your using a diffrent mod for unifiying
        console.info("Info below about 'Doesn't have' are not errors and should not be reported: ")

        //stuff out of loop for outliers

            //gears
                event.remove({id: "thermal:parts/lapis_gear"})
                event.shaped("thermal:lapis_gear",[
                    " i ",
                    "ici",
                    " i ",
                ],{i: "#forge:gems/lapis", c: gearcenter})

                event.remove({output: "#forge:gears/diamond"})
                event.shaped("alltheores:diamond_gear",[
                    " i ",
                    "ici",
                    " i ",
                ],{i: "#forge:gems/diamond", c: gearcenter})
                
            //osmium
                event.remove({output: "alltheores:osmium_rod"})
                event.remove({output: "alltheores:osmium_gear"})
                event.remove({output: "alltheores:osmium_plate"})

            //other
                event.replaceOutput({},'#forge:storage_blocks/charcoal',"thermal:charcoal_block")
                event.remove({input:"#alltheores:ore_hammers"})

        // Loop for rest ↓

        metals.forEach (metal =>{ // Itterating through each metal in metals table
            let n = metal.name
            let fingot = "#forge:ingots/"+n

            //ingots
            if (metal.ingot !== null){
                event.replaceOutput({},'#forge:ingots/'+n,metal.ingot)
            }
            else{console.warn(n+" doesnt have metal.ingot, This may cause issues!")}


            //ingotblocks
            if (metal.ingotBlock !== null){
                
                // to block
                    event.remove({output:'#forge:storage_blocks/', input: "#forge:ingots/"+n  ,type:"minecraft:crafting_shaped"})
                    event.remove({output:'#forge:storage_blocks/', input: "#forge:ingots/"+n  ,type:"minecraft:crafting_shapeless"})
                    event.shapeless(metal.ingotBlock,["9x #forge:ingots/"+n])
                
                // to ingot
                    event.remove({output: "9x #forge:ingots/"+n, input:'#forge:storage_blocks/'+n,type:"minecraft:crafting_shaped"})
                    event.remove({output: "9x #forge:ingots/"+n, input:'#forge:storage_blocks/'+n,type:"minecraft:crafting_shapless"})
                    event.shapeless(metal.ingotBlock ,["9x #forge:ingots/"+n])
                
                event.replaceOutput({},'#forge:storage_blocks/'+n,metal.ingotBlock)
            }
            else{console.info(n+" doesnt have metal.ingotBlock")}

            //raw
            if (metal.raw !== null){
                event.replaceOutput({},'#forge:raw_materials/'+n,metal.raw)
            }
            else{console.info(n+" doesnt have metal.raw")}

            //rawBlock
            if (metal.rawBlock !== null){
                
                // to block
                    event.remove({output: '#forge:storage_blocks/raw_'+n, input: "#forge:raw_materials/"+n ,type:"minecraft:crafting_shaped"})
                    event.remove({output: '#forge:storage_blocks/raw_'+n, input: "#forge:raw_materials/"+n ,type:"minecraft:crafting_shapeless"})
                    event.shapeless(metal.rawBlock,["9x #forge:raw_materials/"+n,])
                
                //to raw
                    event.remove({input: '#forge:storage_blocks/raw_'+n, output: "#forge:raw_materials/"+n ,type:"minecraft:crafting_shapeled"})
                    event.remove({input: '#forge:storage_blocks/raw_'+n, output: "#forge:raw_materials/"+n ,type:"minecraft:crafting_shapeless"})
                    event.shapeless("9x "+metal.raw,['#forge:storage_blocks/raw_'+n])
                
                event.replaceOutput({},'#forge:storage_blocks/raw_'+n,metal.rawBlock)  //blanked to be removed, hopefully, eventually
            }
            else{console.info(n+" doesnt have metal.rawBlock")}

            //nugget
            if (metal.nugget !== null){
                
                // to nuggets
                    event.remove({output: "#forge:nuggets/"+n, input: "#forge:ingots/"+n, type:"minecraft:crafting_shaped"})
                    event.remove({output: "#forge:nuggets/"+n, input: "#forge:ingots/"+n, type:"minecraft:crafting_shapeless"})
                    event.shapeless("9x "+metal.nugget,["#forge:ingots/"+n,])
                
                //to ingots
                    event.remove({input: "#forge:nuggets/"+n, output: "#forge:ingots/"+n, type:"minecraft:crafting_shaped"})
                    event.remove({input: "#forge:nuggets/"+n, output: "#forge:ingots/"+n, type:"minecraft:crafting_shapeless"})
                    event.shapeless(metal.ingot,["9x #forge:nuggets/"+n])
                
                event.replaceOutput({},'#forge:nuggets/'+n,metal.nugget)
            }
            else{console.info(n+" doesnt have metal.nugget")}

            //dust
            if (metal.dust !== null){
                //moving all of this to a new file in the next update so for now its just totally messed up and im ok with that ↓

                /*removeids([
                    "alltheores:"+n+"dust_from_hammer_crushing",
                    "alltheores:"+n+"dust_from_hammer_ingot_crushing",
                    "immersiveengineering:crafting/hammercrushing_"+n,
                    "immersiveengineering:crafting/raw_hammercrushing_"+n,
                    "ftbic:macerating/raw_materals/"+n+"_to_dust",
                ])*/
                event.replaceOutput({},'#forge:dusts/'+n,metal.dust,)
            }
            else{console.info(n+" doesnt have metal.dust")}

            //plate
            if (metal.plate !== null){
                
                //removing all other ways of making gears
                    event.remove({output: "#forge:plates/"+n})
                    event.remove({id: "ftbic:rolling/ingots/"+metals.name+"_to_"+n+"_plate"})
                    event.remove({id: "minecraft:rolling/"+metals.name})
                    event.remove({id: "createaddition:rolling/"+metals.name})
                
                //re-adding 
                    event.recipes.ftbic.rolling(metal.plate, ["#forge:ingots/"+n])
                    event.recipes.createPressing(metal.plate, ["#forge:ingots/"+n])
                    event.recipes.thermalPress(metal.plate, ["#forge:ingots/"+n])
                    event.recipes.immersiveengineering.metal_press(metal.plate, fingot, "immersiveengineering:mold_plate")
                
                //hammer plates
                    let hammer = Item.of("immersiveengineering:hammer").ignoreNBT()
                   // event.shapeless(metal.plate,["#forge:ingots/"+n,hammer]).damageItem(hammer)

            }
            else{ console.info(n+" doesnt have metal.plate") }

            //gear
            if (metal.gear !== null){ //crafting with table requires 1 iron (or other gearcenter), machines just need 4 metal

                event.remove({output: "#forge:gears/"+n})

                //crafting
                    event.shaped(metal.gear,[
                        ' i ',
                        'ici',
                        ' i ',
                    ], {i: "#forge:ingots/"+n, c: gearcenter})

                //machines
                    event.recipes.ftbic.extruding(metal.gear, ["4x #forge:ingots/"+n])
                    event.recipes.thermalPress(metal.gear, ["4x #forge:ingots/"+n,"thermal:press_gear_die"])
                    event.recipes.immersiveengineering.metal_press(metal.gear, "4x #forge:ingots/"+n, "immersiveengineering:mold_gear")

            }
            else{console.info(n+" doesnt have metal.gear")}

            //rod
            if (metal.rod !== null){  //makes 1 per ingot and hammer normaly, but 2 per ingot with machines
                event.remove({output: "#forge:rods/"+n})

                //crafting tables
                    let hammer = Item.of("immersiveengineering:hammer").ignoreNBT()
                    event.shapeless("2x "+metal.rod,["2x "+fingot,Item.of("immersiveengineering:hammer").ignoreNBT()]).damageItem(Item.of("immersiveengineering:hammer").ignoreNBT())
                
                //machines
                    event.recipes.ftbic.extruding("2x "+metal.rod, [fingot])
                    event.recipes.thermalPress("4x "+metal.rod, ["2x "+fingot,"thermal:press_packing_2x2_die",])
                    event.recipes.immersiveengineering.metal_press("2x "+metal.rod, fingot, "immersiveengineering:mold_rod")

                //event.replaceOutput({},'#forge:rods/'+n,metal.rod) // just in case i missed something
            }
            else{console.info(n+" doesnt have metal.rod")}

        }) // end of metals loop
    } //end of function

    unify(genTable(premetals))  //function call with gentable return passed as metals table to unify function
})
