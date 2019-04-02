let nodes = [
    { // 0
        'name': 'HIDDEN TEMPLE',
        'type': 'shrine',
        'phase': 1,
        'x': 325,
        'y': 603
    },
    { // 1
        'name': 'OWL',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 289,
        'y': 827
    },
    { // 2
        'name': 'LADY BUTTERFLY',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 475,
        'y': 791
    },
    { // 3
        'name': 'AUDIENCE CHAMBER',
        'type': 'shrine',
        'phase': 1,
        'x': 433,
        'y': 1043
    },
    { // 4
        'name': 'GLUTTON',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 257,
        'y': 1100
    },
    { // 5
        'name': 'GLUTTON',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 315,
        'y': 1175
    },
    { // 6
        'name': 'MAIN HALL',
        'type': 'shrine',
        'phase': 1,
        'x': 160,
        'y': 1200
    },
    { // 7
        'name': 'BAMBOO THICKET SLOPE',
        'type': 'shrine',
        'phase': 1,
        'x': 475,
        'y': 1225
    },
    { // 8
        'name': 'SHADOW',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 575,
        'y': 1220
    },
    { // 9
        'name': 'SPEAR',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 355,
        'y': 1400
    },
    { // 10
        'name': 'ESTATE PATH',
        'type': 'shrine',
        'phase': 1,
        'x': 250,
        'y': 1530
    },
    { // 11
        'name': 'DRAGONSPRING HIRATA ESTATE',
        'type': 'shrine',
        'phase': 1,
        'x': 155,
        'y': 1780
    },
    { // 12
        'name': 'DILAPIDATED TEMPLE',
        'type': 'shrine',
        'phase': 1,
        'x': 635,
        'y': 1880
    },
    { // 13
        'name': 'ASHINA OUTSKIRTS',
        'type': 'shrine',
        'phase': 1,
        'x': 890,
        'y': 1830
    },
    { // 14
        'name': 'OUTSKIRTS WALL GATE PATH',
        'type': 'shrine',
        'phase': 1,
        'x': 1140,
        'y': 1900
    },
    { // 15
        'name': 'SAMURAI',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1140,
        'y': 1730
    },
    { // 16
        'name': 'OUTSKIRTS WALL STAIRWAY',
        'type': 'shrine',
        'phase': 1,
        'x': 1109,
        'y': 1511
    },
    { // 17
        'name': 'DEMON OF HATRED',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 3,
        'x': 720,
        'y': 1625
    },
    { // 18
        'name': 'OGRE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 935,
        'y': 1437
    },
    { // 19
        'name': 'GLUTTON',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 3,
        'x': 827,
        'y': 1440
    },
    { // 20
        'name': 'SAMURAI',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 911,
        'y': 1333
    },
    { // 21
        'name': 'UNDERBRIDGE VALLEY',
        'type': 'shrine',
        'phase': 1,
        'x': 697,
        'y': 1307
    },
    { // 22
        'name': 'ASHINA CASTLE GATE FORTRESS',
        'type': 'shrine',
        'phase': 1,
        'x': 930,
        'y': 1127
    },
    { // 23
        'name': 'GYOUBU',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 773,
        'y': 987
    },
    { // 24
        'name': 'ASHINA CASTLE GATE',
        'type': 'shrine',
        'phase': 1,
        'x': 953,
        'y': 771
    },
    { // 25
        'name': 'BULL',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1083,
        'y': 735
    },
    { // 26
        'name': 'ASHINA CASTLE',
        'type': 'shrine',
        'phase': 1,
        'x': 1350,
        'y': 750
    },
    { // 27
        'name': 'SAMURAI',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1230,
        'y': 800
    },
    { // 28
        'name': 'OGRE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 1195,
        'y': 890
    },
    { // 29
        'name': 'NEAR SECRET PASSAGE',
        'type': 'shrine',
        'phase': 1,
        'x': 1165,
        'y': 560
    },
    { // 30
        'name': 'GENICHIRO & ISSHIN, SWORD SAINT',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 3,
        'x': 1050,
        'y': 300
    },
    { // 31
        'name': 'UPPER TOWER ANTECHAMBER',
        'type': 'shrine',
        'phase': 1,
        'x': 1490,
        'y': 500
    },
    { // 32
        'name': 'UPPER TOWER ASHINA DOJO',
        'type': 'shrine',
        'phase': 1,
        'x': 1410,
        'y': 240
    },
    { // 33
        'name': 'ELITE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 3,
        'x': 1325,
        'y': 185
    },
    { // 34
        'name': 'SHADOW',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 1640,
        'y': 130
    },
    { // 35
        'name': 'ELITE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1660,
        'y': 237
    },
    { // 36
        'name': 'CASTLE TOWER LOOKOUT',
        'type': 'shrine',
        'phase': 1,
        'x': 1920,
        'y': 150
    },
    { // 37
        'name': 'EMMA & ISSHIN ASHINA',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 2375,
        'y': 250
    },
    { // 38
        'name': 'OWL',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 1940,
        'y': 440
    },
    { // 39
        'name': 'UPPER TOWER KURO\'S ROOM',
        'type': 'shrine',
        'phase': 1,
        'x': 2100,
        'y': 575
    },
    { // 40
        'name': 'OLD GRAVE',
        'type': 'shrine',
        'phase': 1,
        'x': 1220,
        'y': 1170
    },
    { // 41
        'name': 'HEADLESS (UNGO)',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1300,
        'y': 1100
    },
    { // 42
        'name': 'GREAT SERPENT SHRINE',
        'type': 'shrine',
        'phase': 1,
        'x': 1360,
        'y': 1400
    },
    { // 43
        'name': 'SHADOW',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 1280,
        'y': 1530
    },
    { // 44
        'name': 'UNDER-SHRINE VALLEY',
        'type': 'shrine',
        'phase': 1,
        'x': 1500,
        'y': 1610
    },
    { // 45
        'name': 'HEADLESS (GOKAN)',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1620,
        'y': 1585
    },
    { // 46
        'name': 'SUNKEN VALLEY',
        'type': 'shrine',
        'phase': 1,
        'x': 1780,
        'y': 1750
    },
    { // 47
        'name': 'SNIPER',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1585,
        'y': 1800
    },
    { // 48
        'name': 'GUN FORT',
        'type': 'shrine',
        'phase': 1,
        'x': 1450,
        'y': 1910
    },
    { // 49
        'name': 'CENTIPEDE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1637,
        'y': 1931
    },
    { // 50
        'name': '',
        'type': 'key',
        'icon': 'default.png',
        'phase': 1,
        'x': 1740,
        'y': 2000
    },
    { // 51
        'name': 'RIVEN CAVE',
        'type': 'shrine',
        'phase': 1,
        'x': 1850,
        'y': 2013
    },
    { // 52
        'name': 'BODHISATTVA VALLEY',
        'type': 'shrine',
        'phase': 1,
        'x': 2090,
        'y': 1887
    },
    { // 53
        'name': 'GUARDIAN APE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2335,
        'y': 1960
    },
    { // 54
        'name': 'GREAT APE\'S WATERING HOLE',
        'type': 'shrine',
        'phase': 1,
        'x': 2585,
        'y': 1995
    },
    { // 55
        'name': 'ABANDONED DUNGEON ENTRANCE',
        'type': 'shrine',
        'phase': 1,
        'x': 1655,
        'y': 755
    },
    { // 56
        'name': 'UNDERGROUND WATERWAY',
        'type': 'shrine',
        'phase': 1,
        'x': 1975,
        'y': 1050
    },
    { // 57
        'name': 'SENPOU TEMPLE MT. KONGO',
        'type': 'shrine',
        'phase': 1,
        'x': 2240,
        'y': 1110
    },
    { // 58
        'name': 'SHUGENDO',
        'type': 'shrine',
        'phase': 1,
        'x': 2490,
        'y': 900
    },
    { // 59
        'name': 'BELL DEMON\'S TEMPLE',
        'type': 'shrine',
        'phase': 1,
        'x': 2170,
        'y': 760
    },
    { // 60
        'name': 'HEADLESS (AKO)',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1975,
        'y': 835
    },
    { // 61
        'name': 'SUNKEN VALLEY CAVERN',
        'type': 'shrine',
        'phase': 1,
        'x': 2650,
        'y': 1100
    },
    { // 62
        'name': 'KNIGHT',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2515,
        'y': 745
    },
    { // 63
        'name': 'TEMPLE GROUNDS',
        'type': 'shrine',
        'phase': 1,
        'x': 2490,
        'y': 520
    },
    { // 64
        'name': 'MAIN HALL',
        'type': 'shrine',
        'phase': 1,
        'x': 2715,
        'y': 420
    },
    { // 65
        'name': 'CENTIPEDE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2613,
        'y': 413
    },
    { // 66
        'name': 'MONKEYS',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2950,
        'y': 320
    },
    { // 67
        'name': 'INNER SANCTUM',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 3195,
        'y': 235
    },
    

];

let connections = [

];