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
        'type': 'encounter_mjr',
        'icon': 'default.png',
        'phase': 2,
        'x': 289,
        'y': 827
    },
    { // 2
        'name': 'LADY BUTTERFLY',
        'type': 'encounter_mjr',
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
        'type': 'encounter_mjr',
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
        'type': 'encounter_mjr',
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
        'type': 'encounter_mjr',
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
        'type': 'encounter_mjr',
        'icon': 'default.png',
        'phase': 2,
        'x': 2375,
        'y': 250
    },
    { // 38
        'name': 'OWL',
        'type': 'encounter_mjr',
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
        'type': 'encounter_mjr',
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
        'type': 'encounter_mjr',
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
    { // 68
        'name': 'ASHINA RESERVOIR',
        'type': 'shrine',
        'phase': 1,
        'x': 1467,
        'y': 988
    },
    { // 69 (lol)
        'name': 'SPEAR',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1560,
        'y': 945
    },
    { // 70
        'name': 'SPEAR & SAMURAI',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 3,
        'x': 1590,
        'y': 1030
    },
    { // 71
        'name': 'SHADOW',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1640,
        'y': 1215
    },
    { // 72
        'name': 'BOTTOMLESS HOLE',
        'type': 'shrine',
        'phase': 1,
        'x': 1700,
        'y': 1300
    },
    { // 73
        'name': 'SHICHIMEN',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 1877,
        'y': 1246
    },
    { // 74
        'name': 'ASHINA DEPTHS',
        'type': 'shrine',
        'phase': 1,
        'x': 1870,
        'y': 1530
    },
    { // 75
        'name': 'POISON POOL',
        'type': 'shrine',
        'phase': 1,
        'x': 2150,
        'y': 1600
    },
    { // 76
        'name': 'SNIPER',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2300,
        'y': 1520
    },
    { // 77
        'name': 'DUAL APES',
        'type': 'encounter_mjr',
        'icon': 'default.png',
        'phase': 1,
        'x': 2400,
        'y': 1375
    },
    { // 78
        'name': 'SHICHIMEN',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2540,
        'y': 1365
    },
    { // 79
        'name': 'HIDDEN FOREST',
        'type': 'shrine',
        'phase': 1,
        'x': 2735,
        'y': 1340
    },
    { // 80
        'name': 'HEADLESS (GAICHIIN)',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2837,
        'y': 1420
    },
    { // 81
        'name': 'GLUTTON',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2750,
        'y': 1485
    },
    { // 82
        'name': 'NOBLE',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2575,
        'y': 1535
    },
    { // 83
        'name': 'MIBU VILLAGE',
        'type': 'shrine',
        'phase': 1,
        'x': 2470,
        'y': 1630
    },
    { // 84
        'name': 'WATER MILL',
        'type': 'shrine',
        'phase': 1,
        'x': 2755,
        'y': 1805
    },
    { // 85
        'name': 'O\'RIN',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 1,
        'x': 2830,
        'y': 1725
    },
    { // 86
        'name': 'CORRUPTED MONK',
        'type': 'encounter_mjr',
        'icon': 'default.png',
        'phase': 1,
        'x': 2941,
        'y': 1890
    },
    { // 87
        'name': 'WEDDING CAVE ENTRANCE',
        'type': 'shrine',
        'phase': 1,
        'x': 3160,
        'y': 2010
    },
    { // 88
        'name': 'FOUNTAINHEAD PALACE',
        'type': 'shrine',
        'phase': 2,
        'x': 3495,
        'y': 1880
    },
    { // 89
        'name': 'TRUE MONK',
        'type': 'encounter_mjr',
        'icon': 'default.png',
        'phase': 2,
        'x': 3625,
        'y': 1695
    },
    { // 90
        'name': 'VERMILLION BRIDGE',
        'type': 'shrome',
        'phase': 2,
        'x': 3400,
        'y': 1485
    },
    { // 91
        'name': 'MIBU MANOR',
        'type': 'shrine',
        'phase': 2,
        'x': 3095,
        'y': 1370
    },
    { // 92
        'name': 'BULL',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 2495,
        'y': 1254
    },
    { // 93
        'name': 'FLOWER VIEWING STAGE',
        'type': 'shrine',
        'phase': 2,
        'x': 2935,
        'y': 1060
    },
    { // 94
        'name': 'GREAT SAKURA',
        'type': 'shrine',
        'phase': 2,
        'x': 3350,
        'y': 1110
    },
    { // 95
        'name': 'HEADLESS (YASHI)',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 3260,
        'y': 1215
    },
    { // 96
        'name': 'OKAMI',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 3460,
        'y': 1130
    },
    { // 97
        'name': 'SHICHIMEN',
        'type': 'encounter',
        'icon': 'default.png',
        'phase': 2,
        'x': 3330,
        'y': 890
    },
    { // 98
        'name': 'PALACE GROUNDS',
        'type': 'shrine',
        'phase': 2,
        'x': 3210,
        'y': 787
    },
    { // 99
        'name': 'NEAR POT NOBLE',
        'type': 'shrine',
        'phase': 2,
        'x': 2875,
        'y': 785
    },
    { // 100
        'name': 'FEEDING GROUNDS',
        'type': 'shrine',
        'phase': 2,
        'x': 3595,
        'y': 855
    },
    { // 101
        'name': 'SANCTUARY',
        'type': 'shrine',
        'phase': 2,
        'x': 3370,
        'y': 505
    },
    { // 102
        'name': 'DIVINE DRAGON',
        'type': 'encounter_mjr',
        'icon': 'default.png',
        'phase': 2,
        'x': 3500,
        'y': 320
    },
    { // 103
        'name': 'GENICHIRO ASHINA',
        'type': 'encounter_mjr',
        'icon': 'default.png',
        'phase': 1,
        'x': 1940,
        'y': 440
    },
    

];

// types (t): 0=2-way, 1=1-way, 2=2-way(dashed)
let connections = [
    [{'t': 0, id: 1}, {'t': 0, id: 2}], // 0
    [{'t': 0, id: 3}], // 1
    [{'t': 0, id: 3}], // 2
    [{'t': 0, id: 4}, {'t': 0, id: 5}], // 3
    [{'t': 0, id: 6}], // 4
    [{'t': 0, id: 6}], // 5
    [{'t': 0, id: 7}], // 6
    [{'t': 0, id: 9}], // 7
    [], // 8
    [{'t': 0, id: 10}], // 9
    [{'t': 0, id: 11}], // 10
    [{'t': 2, id: 12}], // 11
    [{'t': 0, id: 13}], // 12
    [{'t': 0, id: 14}], // 13
    [{'t': 0, id: 15}], // 14
    [{'t': 0, id: 16}], // 15
    [{'t': 0, id: 17}, {'t': 0, id: 18}, {'t': 2, id: 59}], // 16
    [], // 17
    [{'t': 0, id: 21}], // 18
    [], // 19
    [], // 20
    [{'t': 0, id: 23}], // 22
    [{'t': 0, id: 24}], // 23
    [{'t': 0, id: 25}], // 24
    [{'t': 0, id: 26}], // 25
    [{'t': 0, id: 29}, {'t': 0, id: 31}, {'t': 0, id: 55}, {'t': 0, id: 68}, {'t': 0, id: 40}], // 26
    [], // 27
    [], // 28
    [{'t': 0, id: 30}], // 29
    [], // 30
    [{'t': 0, id: 32}, {'t': 0, id: 36}], // 31
    [{'t': 0, id: 34}, {'t': 0, id: 35}], // 32
    [], // 33
    [{'t': 0, id: 36}], // 34
    [{'t': 0, id: 36}], // 35
    [{'t': 0, id: 37}, {'t': 0, id: 38}, {'t': 0, id: 103}], // 36
    [], // 37
    [{'t': 0, id: 39}], // 38
    [{'t': 0, id: 103}], // 39
    [{'t': 0, id: 42}], // 40
    [], // 41
    [{'t': 0, id: 44}], // 42
    [], // 43
    [{'t': 0, id: 46}], // 44
    [], // 45
    [{'t': 0, id: 48}], // 46
    [], // 47
    [{'t': 0, id: 49}], // 48
    [{'t': 0, id: 50}], // 49
    [{'t': 0, id: 51}], // 50
    [{'t': 0, id: 52}], // 51
    [{'t': 1, id: 75}, {'t': 0, id: 53}], // 52
    [{'t': 0, id: 54}], // 53
    [], // 54
    [{'t': 0, id: 56}], // 55
    [{'t': 0, id: 57}], // 56
    [{'t': 0, id: 58}], // 57
    [{'t': 0, id: 59}, {'t': 0, id: 62}, {'t': 0, id: 61}], // 58
    [], // 59
    [], // 60
    [], // 61
    [{'t': 0, id: 63}], // 62
    [{'t': 0, id: 64}], // 63
    [{'t': 0, id: 66}], // 64
    [], // 65
    [{'t': 0, id: 67}], // 66
    [], // 67
    [{'t': 0, id: 71}], // 68
    [], // 69
    [], // 70
    [{'t': 0, id: 72}], // 71
    [{'t': 1, id: 56}, {'t': 0, id: 74}], // 72
    [], // 73
    [{'t': 0, id: 75}], // 74
    [{'t': 0, id: 76}], // 75
    [{'t': 0, id: 79}], // 76
    [], // 77
    [], // 78
    [{'t': 0, id: 82}], // 79
    [], // 80
    [], // 81
    [{'t': 0, id: 83}], // 82
    [{'t': 0, id: 84}], // 83
    [{'t': 0, id: 86}], // 84
    [], // 85
    [{'t': 0, id: 87}], // 86
    [{'t': 0, id: 88}], // 87
    [{'t': 0, id: 89}], // 88
    [{'t': 0, id: 90}], // 89
    [{'t': 0, id: 91}], // 90
    [{'t': 0, id: 93}], // 91
    [], // 92
    [{'t': 0, id: 94}], // 93
    [{'t': 0, id: 98}, {'t': 0, id: 99}], // 94
    [], // 95
    [], // 96
    [], // 97
    [{'t': 0, id: 99}, {'t': 0, id: 100}, 101], // 98
    [], // 99
    [{'t': 0, id: 101}], // 100
    [], // 101
    [], // 102
    [], // 103
];