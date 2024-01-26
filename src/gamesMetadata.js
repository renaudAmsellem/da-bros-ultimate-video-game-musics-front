const Platforms = {
    NES: 'nintendo',
    SUPER_NES: "Super Nintendo",
    MEGADRIVE: "Mégadrive",
    NINTENDO64: "Nintedo 64",
    GAMECUBE: "Gamecube",
    WII: "Wii",
    WIIU: 'Wii U',
    SWITCH: "Switch",
    GAMEBOY: 'GameBoy ',
    GBA: 'GameBoy Advance',
    DS: 'DS',
    '3DS': "3 DS",
    XBOX360: 'XBOX 360',
    PC: 'PC'
}

export const gamesMetadata = {
    'ActRaiser': {
        date: '1990',
        platform: Platforms.SUPER_NES,
    },
    'Animal Crossing City Folk': {
        date: '2008',
        platform: Platforms.WII,
    },
    'Apollo Justice Ace Attorney': {
        date: '2007',
        platform: Platforms['3DS'],
    },
    'Axelay': {
        date: '1992',
        platform: Platforms.SUPER_NES,
    },
    'Baten Kaitos': {
        date: '2003',
        platform: Platforms.GAMECUBE,
    },
    'Banjo-Kazooie': {
        date: '1998',
        platform: Platforms['NINTENDO64'],
    },
    'Billy Hatcher and the Giant Egg': {
        date: '2003',
        platform: Platforms.GAMECUBE,
    },
    'Bravely Default': {
        date: '2013',
        platform: Platforms['3DS'],
    },
    'Bravely Second': {
        date: '2015',
        platform: Platforms['3DS'],
    },
    'Cadence of Hyrule': {
        date: '2019',
        platform: Platforms.SWITCH
    },
    'Castle Crashers': {
        date: '2008',
        platform: Platforms.PC
    },
    'Castlevania': {
        date: '1986',
        platform: Platforms.NES
    },
    'Castlevania II': {
        date: '1987',
        platform: Platforms.NES
    },
    'Castlevania Judgment': {
        date: '2008',
        platform: Platforms.WII
    },
    'Castlevania Judgment': {
        date: '2008',
        platform: Platforms.WII
    },
    'Castlevania: Dracula X': {
        date: '1995',
        platform: Platforms.SUPER_NES
    },
    'Cave Story': {
        date: '2004',
        platform: Platforms['3DS']
    },
    'Celeste': {
        date: '2018',
        platform: Platforms.PC
    },
    'Children of Mana': {
        date: '2006',
        platform: Platforms.DS
    },
    'Chrono Trigger': {
        date: '1995',
        platform: Platforms.SUPER_NES
    },
    'Conker\'s Bad Fur Day': {
        date: '2001',
        platform: Platforms.NINTENDO64
    },
    'Contra': {
        date: '1988',
        platform: Platforms.NES
    },
    'Contra III': {
        date: '1992',
        platform: Platforms.SUPER_NES
    },
    'Crypt of the NecroDancer': {
        date: '2015',
        platform: Platforms.PC
    },
    'Cursed to Golf': {
        date: '2022',
        platform: Platforms.SWITCH
    },
    'Deltarune': {
        date: '2018',
        platform: Platforms.SWITCH
    },
    'Diddy Kong Racing': {
        date: '1997',
        platform: Platforms.NINTENDO64
    },
    'Donkey Kong 64': {
        date: '1999',
        platform: Platforms.NINTENDO64
    },
    'Donkey Kong Country': {
        date: '1994',
        platform: Platforms.SUPER_NES
    },
    'Donkey Kong Country 2': {
        date: '1995',
        platform: Platforms.SUPER_NES
    },
    'Donkey Kong Country 3': {
        date: '1996',
        platform: Platforms.SUPER_NES
    },
    'Donkey Kong Country Returns': {
        date: '2010',
        platform: Platforms.WII
    },
    'Donkey Kong Country Tropical Freeze': {
        date: '2014',
        platform: Platforms.WIIU
    },
    'Dr. Robotnik\'s Mean Bean Machine': {
        date: '1993',
        platform: Platforms.MEGADRIVE
    },
    'DuckTales': {
        date: '1989',
        platform: Platforms.NES
    },
    'Earthbound': {
        date: '1994',
        platform: Platforms.SUPER_NES
    },
    'F-Zero': {
        date: '1990',
        platform: Platforms.SUPER_NES
    },
    'F-Zero GX': {
        date: '2003',
        platform: Platforms.GAMECUBE
    },
    'Final Fantasy IV': {
        date: '1991',
        platform: Platforms.SUPER_NES
    },
    'Final Fantasy VI': {
        date: '1994',
        platform: Platforms.SUPER_NES
    },
    'Fire Emblem Awakening': {
        date: '2012',
        platform: Platforms['3DS']
    },
    'Fire Emblem Shadows of Valentia': {
        date: '2017',
        platform: Platforms['3DS']
    },
    'Golden Sun': {
        date: '2001',
        platform: Platforms.GBA
    },
    'GoldenEye 007': {
        date: '1997',
        platform: Platforms.NINTENDO64
    },
    'Guacamelee!': {
        date: '2013',
        platform: Platforms.PC
    },
    'Hyrule Warriors': {
        date: '2014',
        platform: Platforms.WIIU
    },
    'Kid Icarus Uprising': {
        date: '2012',
        platform: Platforms['3DS']
    },
    'Kirby 25th Anniversary Orchestra': {
        date: '',
        platform: ''
    },
    'Kirby Air Ride': {
        date: '2003',
        platform: Platforms.GAMECUBE
    },
    'Kirby Planet Robobot': {
        date: '2016',
        platform: Platforms['3DS']
    },
    'Kirby Star Allies': {
        date: '2018',
        platform: Platforms.SWITCH
    },
    'Kirby Super Star': {
        date: '1996',
        platform: Platforms.SUPER_NES
    },
    'Kirby Triple Deluxe': {
        date: '2014',
        platform: Platforms['3DS']
    },
    'Kirby\'s Epic Yarn': {
        date: '2010',
        platform: Platforms.WII
    },
    'Kirby\'s Return to Dream Land': {
        date: '2011',
        platform: Platforms.WII
    },
    'Landstalker': {
        date: '1992',
        platform: Platforms.MEGADRIVE
    },
    'The Legend of the Mystical Ninja': {
        date: '1991',
        platform: Platforms.SUPER_NES
    },
    'Lufia & the Fortress of Doom': {
        date: '1993',
        platform: Platforms.SUPER_NES
    },
    'Lufia II ~ Rise of the Sinistrals': {
        date: '1995',
        platform: Platforms.SUPER_NES
    },
    'Luigi\'s Mansion 2': {
        date: '2013',
        platform: Platforms['3DS']
    },
    'Luigi\'s Mansion 3': {
        date: '2019',
        platform: Platforms.SWITCH
    },
    'Mario & Luigi Bowser\'s Inside Story': {
        date: '2009',
        platform: Platforms.DS
    },
    'Mario & Luigi Dream Team': {
        date: '2013',
        platform: Platforms['3DS']
    },
    'Mario & Luigi Paper Jam': {
        date: '2015',
        platform: Platforms['3DS']
    },
    'Mario & Luigi Partners in Time': {
        date: '2005',
        platform: Platforms.DS
    },
    'Mario & Sonic at the Olympic Games': {
        date: '2007',
        platform: Platforms.WII
    },
    'Mario Kart 8': {
        date: '2014',
        platform: Platforms.WIIU
    },
    'Mario Kart 64': {
        date: '1996',
        platform: Platforms.NINTENDO64
    },
    'Mario Kart Double Dash!!': {
        date: '2003',
        platform: Platforms.GAMECUBE
    },
    'Mario Kart DS': {
        date: '2005',
        platform: Platforms.DS
    },
    'Mario Kart Wii': {
        date: '2008',
        platform: Platforms.WII
    },
    'Mario Party 2': {
        date: '1999',
        platform: Platforms.NINTENDO64
    },
    'Mario Party 9': {
        date: '2012',
        platform: Platforms.WII
    },
    'Mario Sports Mix': {
        date: '2010',
        platform: Platforms.WII
    },
    'Mega Bomberman': {
        date: '1994',
        platform: Platforms.MEGADRIVE
    },
    'Mega Man II': {
        date: '1991',
        platform: Platforms.GAMEBOY
    },
    'Mega Man III': {
        date: '1992',
        platform: Platforms.GAMEBOY
    },
    'Mega Man IV': {
        date: '1993',
        platform: Platforms.GAMEBOY
    },
    'Mega Man V': {
        date: '1994',
        platform: Platforms.GAMEBOY
    },
    'Mega Man X': {
        date: '1993',
        platform: Platforms.SUPER_NES
    },
    'Metroid Prime': {
        date: '2002',
        platform: Platforms.GAMECUBE
    },
}