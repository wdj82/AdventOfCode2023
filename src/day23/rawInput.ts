export const rawInput = `#.###########################################################################################################################################
#.....###...###...#...###...#...###...#...###...###...#...#.........###...###...#.......#...###...#...#...###.....#...#.....#...#...#...#...#
#####.###.#.###.#.#.#.###.#.#.#.###.#.#.#.###.#.###.#.#.#.#.#######.###.#.###.#.#.#####.#.#.###.#.#.#.#.#.###.###.#.#.#.###.#.#.#.#.#.#.#.#.#
#.....#...#...#.#.#.#.#...#.#.#.#...#.#.#...#.#...#.#.#.#.#.#.......#...#...#.#.#.#.....#.#.#...#.#.#...#...#...#.#.#.#...#.#.#.#.#.#.#.#.#.#
#.#####.#####.#.#.#.#.#.###.#.#.#.###.#.###.#.###.#.#.#.#.#.#.#######.#####.#.#.#.#.#####.#.#.###.#.#######.###.#.#.#.###.#.#.#.#.#.#.#.#.#.#
#.#...#...#...#.#.#.#.#...#.#.#.#...#.#.#...#...#.#.#.#.#.#.#.#...###.....#.#.#...#...#...#.#...#.#.....#...#...#.#.#.#...#...#.#.#.#.#.#.#.#
#.#.#.###.#.###.#.#.#.###.#.#.#.###.#.#.#.#####.#.#.#.#.#.#.#.#.#.#######.#.#.#######.#.###.###.#.#####.#.###.###.#.#.#.#######.#.#.#.#.#.#.#
#.#.#.#...#...#.#...#.#...#...#.#...#.#.#.>.>.#.#.#.#.#.#.#.#...#.>.>.#...#.#.#.......#.#...#...#.#.>.>.#.....#...#.#.#.#.......#.#.#.#.#.#.#
#.#.#.#.#####v#.#####.#.#######.#.###.#.###v#.#.#.#.#.#.#.#.#######v#.#.###.#.#.#######.#.###.###.#.#v#########.###.#.#.#.#######.#.#.#.#.#.#
#...#.#.#...#.>.#.....#.....#...#.#...#.#...#...#.#.#.#.#.#.#.....#.#.#...#...#.#...#...#.....###.#.#.#.....###.....#.#.#.....###.#.#.#.#.#.#
#####.#.#.#.#v###.#########.#.###.#.###.#.#######.#.#.#.#.#.#.###.#.#.###.#####.#.#.#.###########.#.#.#.###.#########.#.#####.###.#.#.#.#.#.#
#...#...#.#.#...#...#...#...#...#.#.#...#.......#.#.#.#.#.#.#...#...#.#...###...#.#.#.....#...###...#...###.........#.#.#...#...#.#.#.#.#.#.#
#.#.#####.#.###.###.#.#.#.#####.#.#.#.#########.#.#.#.#.#.#.###.#####.#.#####.###.#.#####.#.#.#####################.#.#.#.#.###.#.#.#.#.#.#.#
#.#...###.#.....#...#.#.#...###...#.#.#.........#...#.#.#...###.....#...#...#.....#.....#...#.......#.......#.......#...#.#.....#.#.#.#.#.#.#
#.###.###.#######.###.#.###.#######.#.#.#############.#.###########.#####.#.###########.###########.#.#####.#.###########.#######.#.#.#.#.#.#
#...#...#...#...#.....#.#...#.......#.#.#.......#...#...###.........#.....#.............#.........#.#.....#...#...#...###.#.....#.#.#.#.#.#.#
###.###.###.#.#.#######.#.###.#######.#.#.#####.#.#.#######.#########.###################.#######.#.#####.#####.#.#.#.###.#.###.#.#.#.#.#.#.#
###...#.###...#.....###.#...#.........#...#...#...#...#.....#.......#.....#.....#...>.>.#.......#...#...#...#...#...#...#.#.###...#...#...#.#
#####.#.###########.###.###.###############.#.#######.#.#####.#####.#####.#.###.#.###v#.#######.#####.#.###.#.#########.#.#.###############.#
#...#.#...........#...#.....###...#.........#.......#.#.......#...#.#.....#.#...#.#...#...#...#...#...#.....#.#.......#.#.#.#.............#.#
#.#.#.###########.###.#########.#.#.###############.#.#########.#.#.#.#####.#.###.#.#####.#.#.###.#.#########.#.#####.#.#.#.#.###########.#.#
#.#...#.........#.#...#.....#...#.#...............#.#.#.........#...#.......#.#...#.#...#.#.#.#...#.......#...#.....#.#.#.#.#...#...#...#...#
#.#####.#######.#.#.###.###.#.###.###############.#.#.#.#####################.#.###.#.#.#.#.#.#.#########.#.#######.#.#.#.#.###.#.#.#.#.#####
#.#...#.#.......#...###...#.#...#.#...............#...#.........#.....#.....#...#...#.#.#...#.#.#.........#.#.......#...#...###...#...#.....#
#.#.#.#.#.###############.#.###.#.#.###########################.#.###.#.###.#####.###.#.#####.#.#.#########.#.#############################.#
#...#...#.....#...#...#...#.....#.#...........#...###...###.....#.#...#.#...#...#.....#.....#.#.#...#.......#.............###...###...#.....#
#############.#.#.#.#.#.#########.###########.#.#.###.#.###.#####.#.###.#.###.#.###########.#.#.###.#.###################.###.#.###.#.#.#####
#.............#.#.#.#.#...#.......#...#.......#.#...#.#...#.......#.....#.#...#.............#...###...#...................#...#.#...#.#.....#
#.#############.#.#.#.###.#.#######.#.#.#######.###.#.###.###############.#.###########################.###################.###.#.###.#####.#
#.........#...#.#.#.#.###.#.#...###.#.#.....###.#...#...#.#...#...........#.#...#...###...#...###.....#.....#.......#...#...#...#...#.#...#.#
#########.#.#.#.#.#.#.###.#.#.#.###.#.#####v###.#.#####.#.#.#.#v###########.#.#.#.#.###.#.#.#.###.###.#####.#.#####.#.#.#.###.#####.#.#v#.#.#
#.........#.#.#.#...#...#.#.#.#...#.#.....>.>.#.#...#...#.#.#.>.>.........#...#...#.....#...#...#...#.#...#...#.....#.#.#...#.#.....#.>.#...#
#.#########.#.#.#######.#.#.#.###.#.#######v#.#.###.#.###.#.###v#########.#####################.###.#.#.#.#####.#####.#.###.#.#.#######v#####
#.#...#...#.#.#...#.....#.#...###...#.......#.#.###.#...#...#...#.........#...#...#...#.........#...#.#.#.#...#...###.#.###.#...###...#.#...#
#.#.#.#.#.#.#.###.#.#####.###########.#######.#.###.###.#####.###.#########.#.#.#.#.#.#.#########.###.#.#.#.#.###.###.#.###.#######.#.#.#.#.#
#.#.#.#.#.#.#.#...#.....#.....###...#.......#.#...#.#...#.....#...###.......#...#...#...#...#...#...#.#.#.#.#.#...#...#.#...#.....#.#.#...#.#
#.#.#.#.#v#.#.#.#######.#####.###.#.#######.#.###.#.#.###.#####.#####.###################.#.#.#.###.#.#.#.#.#.#.###.###.#.###.###.#.#.#####.#
#.#.#...#.>.#.#.#.......#.....#...#...#...#.#...#.#.#.###.....#.#...#...#...........#...#.#.#.#.###.#.#.#.#.#.#...#...#.#.###...#.#.#...#...#
#.#.#####v###.#.#.#######.#####.#####.#.#.#.###.#.#.#.#######.#.#.#.###.#.#########.#.#.#.#.#.#.###.#.#.#.#.#.###v###.#.#.#####.#.#.###.#.###
#...###...#...#.#.....#...#.....#...#...#.#...#.#.#.#.#.......#...#...#...#...#...#.#.#.#.#.#.#...#.#.#.#.#.#.#.>.>...#...#.....#.#.###.#...#
#######.###.###.#####.#.###.#####.#.#####.###.#.#.#.#.#.#############.#####.#.#.#.#v#.#.#.#.#.###.#.#.#.#.#.#.#.#v#########.#####.#.###.###.#
#...#...###...#.#.....#...#...#...#.#...#.....#...#.#.#.#...###...###...#...#.#.#.>.>.#.#.#.#...#.#.#.#.#...#...#.......#...#...#.#...#.#...#
#.#.#.#######.#.#.#######.###.#.###.#.#.###########.#.#.#.#.###.#.#####.#.###.#.###v###.#.#.###.#.#.#.#.###############.#.###.#.#.###.#.#.###
#.#...#.....#...#.........#...#.#...#.#.....#.....#...#...#...#.#.......#.###...#...###.#.#.#...#...#...###...........#.#...#.#.#.....#.#...#
#.#####.###.###############.###.#.###.#####.#.###.###########.#.#########.#######.#####.#.#.#.#############.#########.#.###.#.#.#######.###.#
#.#...#.#...#.......#.....#.....#.....#...#...#...#...........#...#.....#.#...#...#...#...#...#.....#.....#.........#...###...#.....###.....#
#.#.#.#.#.###.#####.#.###.#############.#.#####.###.#############.#.###.#.#.#.#.###.#.#########.###.#.###.#########.###############.#########
#...#...#...#.....#.#...#.....#.........#.....#...#...........###...###.#.#.#.#.....#...#...###.#...#...#.........#.......#.........#...#####
###########.#####.#.###.#####.#.#############.###.###########.#########.#.#.#.#########.#.#.###.#.#####.#########.#######.#.#########.#.#####
#...#.......#...#.#.###...#...#.............#.#...#...........#...#...#.#.#.#.#...#.....#.#.#...#.#...#.........#.........#...........#.....#
#.#.#.#######.#.#.#.#####.#.###############.#.#.###.###########.#.#.#.#.#.#.#.#.#.#.#####.#.#.###.#.#.#########.###########################.#
#.#...#.....#.#.#.#.#...#.#.#...#...........#...###.............#.#.#.#...#.#...#...###...#.#...#.#.#.###...#...#...###...#.....#...........#
#.#####.###.#.#.#.#.#.#.#.#.#.#.#.###############################.#.#.#####.###########.###.###.#.#.#.###.#.#v###.#.###.#.#.###.#.###########
#.#...#...#.#.#.#.#.#.#.#.#.#.#.#...#####...#.....#...#...........#.#.###...#.....#...#...#...#.#.#.#.#...#.>.>.#.#.###.#.#...#.#...........#
#.#.#.###.#.#.#.#.#.#.#.#.#.#.#.###v#####.#.#.###.#.#.#.###########.#.###.###.###.#.#.###.###.#.#.#.#.#.#####v#.#.#.###.#.###v#.###########.#
#.#.#.#...#.#.#.#.#.#.#...#.#.#...>.>.###.#.#.#...#.#.#...........#.#...#...#...#.#.#.#...###...#.#.#.#...#...#...#...#.#.#.>.#.............#
#.#.#v#.###.#.#.#.#.#.#####.#.#####v#.###.#.#.#.###.#.###########.#.###.###v###.#.#.#.#.#########.#.#.###.#.#########.#.#.#.#v###############
#...#.>.#...#.#.#.#.#.....#.#...#...#...#.#.#.#...#.#.#.........#.#...#...>.>.#.#...#.#.###.......#.#...#.#.....#...#.#.#.#.#.........#...###
#####v###.###.#.#.#.#####.#.###.#.#####.#.#.#.###.#.#.#.#######.#.###.#####v#.#.#####.#.###.#######.###.#.#####.#.#.#.#.#.#.#########.#.#.###
#.....###...#.#.#.#.#...#.#.....#.....#...#.#.#...#.#.#.....###...#...###...#...#...#.#...#.#.....#.#...#.#.....#.#.#...#.#.#.........#.#...#
#.#########.#.#.#.#.#.#.#.###########.#####.#.#.###.#.#####.#######.#####.#######.#.#.###.#.#.###.#.#.###.#.#####.#.#####.#.#.#########.###.#
#.....#...#...#...#.#.#.#.#...........###...#.#...#.#...#...#...###.....#.#...###.#.#.....#...#...#.#.#...#.......#.#...#.#.#.....#...#.#...#
#####.#.#.#########.#.#.#.#.#############.###.###.#.###.#.###.#.#######.#.#.#.###.#.###########.###.#.#.###########.#.#.#.#.#####.#.#.#.#.###
#...#...#.......#...#.#...#.....#...#...#.#...#...#.#...#...#.#.#...#...#.#.#.....#...........#.....#...#...#.....#...#.#.#.#.....#.#...#...#
#.#.###########.#.###.#########.#.#.#.#.#.#.###.###.#.#####v#.#.#.#.#.###.#.#################.###########.#.#.###.#####.#.#.#.#####.#######.#
#.#.............#.....#.........#.#...#.#.#.#...#...#.....>.>.#.#.#...###.#.#.......#.....#...#...........#...###.#.....#...#.....#.#.......#
#.#####################.#########.#####.#.#.#.###.#########v###.#.#######.#.#.#####.#.###.#.###.#################.#.#############.#.#.#######
#.#...#...#...#####...#...#...#...###...#.#.#...#.#.....#...###.#.#.....#...#.....#.#...#...#...#...#...........#.#.....#.......#...#.......#
#.#.#.#.#.#.#.#####.#.###.#.#.#.#####.###.#.###.#.#.###.#.#####.#.#.###.#########.#.###.#####.###.#.#.#########.#.#####.#.#####.###########.#
#.#.#.#.#.#.#...#...#...#...#...#...#...#...#...#.#...#...#...#...#.#...#...###...#.#...#...#.....#...#.........#.......#.#...#.............#
#.#.#.#.#.#.###.#.#####.#########.#.###.#####.###.###.#####.#.#####.#.###.#.###.###.#.###.#.###########.#################.#.#.###############
#...#...#...#...#.#.....#...#...#.#...#.....#.#...#...#...#.#.#...#.#.#...#.#...###...###.#.#...#...###.................#...#...............#
#############.###.#.#####.#.#.#.#.###.#####.#.#.###.###.#.#.#.#.#.#.#.#.###.#.###########.#.#.#.#.#.###################.###################.#
#.............#...#.....#.#.#.#.#...#.#.....#...###.....#.#.#.#.#.#.#.#.#...#...#####...#.#.#.#.#.#.#...#...............###...#.............#
#.#############.#######.#.#.#.#.###.#.#.#################.#.#.#.#.#.#.#.#.#####v#####.#.#.#.#.#.#.#.#.#.#.#################.#.#.#############
#.....#.....###.#.......#.#.#.#...#.#.#...#...#...#...#...#.#...#.#.#.#.#.#...>.>.###.#.#.#...#.#.#.#.#.#.....#...#...#...#.#.#.............#
#####.#.###.###.#.#######.#.#.###.#.#.###.#.#.#.#.#.#.#.###.#####.#.#.#.#.#.###v#.###.#.#.#####.#.#.#.#.#####.#.#.#.#.#.#.#.#.#############.#
#.....#.###...#.#.#...###.#.#...#.#.#.#...#.#.#.#.#.#.#...#.....#.#.#.#.#...#...#...#.#.#.....#.#.#.#.#.#...#.#.#...#.#.#.#.#.#.............#
#.#####.#####v#.#.#.#.###.#.###.#.#.#.#v###.#.#.#.#.#.###v#####.#.#.#.#.#####.#####.#.#.#####.#.#.#.#.#.#.#.#v#.#####.#.#.#.#.#.#############
#.#...#.#...#.>.#...#.#...#...#.#.#.#.>.>...#.#.#.#.#.#.>.>.....#.#.#.#...#...#####.#.#.#.....#.#.#.#.#.#.#.>.>.#.....#.#.#.#.#.........#####
#.#.#.#.#.#.#v#######.#.#####.#.#.#.###v#####.#.#.#.#.#.#v#######.#.#.###.#.#######.#.#.#.#####.#.#.#.#.#.###v###.#####.#.#.#.#########.#####
#.#.#...#.#...#...#...#.....#...#...#...#...#...#...#.#.#.#####...#.#.#...#.....#...#.#.#...#...#.#.#.#.#.###.#...#...#.#.#.#.#...#...#.....#
#.#.#####.#####.#.#.#######.#########.###.#.#########.#.#.#####.###.#.#.#######.#.###.#.###.#.###.#.#.#.#.###.#.###.#.#.#.#.#.#.#.#.#.#####.#
#...###...#...#.#.#...#...#.#.......#...#.#.......###...#.....#.....#.#.#.......#.....#.#...#...#.#...#...#...#...#.#...#.#.#.#.#.#.#.#...#.#
#######.###.#.#.#.###.#.#.#.#.#####.###.#.#######.###########.#######.#.#.#############.#.#####.#.#########.#####.#.#####.#.#.#.#.#.#.#v#.#.#
#.....#.....#.#.#...#.#.#.#.#.#...#...#...#...#...#...........###...#...#.........#...#.#.#.....#.#.........#.....#.....#.#.#.#.#...#.>.#.#.#
#.###.#######.#.###.#.#.#.#.#.#.#.###.#####.#.#.###.#############.#.#############.#.#.#.#.#.#####.#.#########.#########.#.#.#.#.#######v#.#.#
#...#.....#...#.#...#.#.#...#.#.#...#...#...#.#.#...#.....#.....#.#...#...........#.#.#...#.....#.#...#.....#...#...#...#.#.#.#.#.......#...#
###.#####.#.###.#.###.#.#####.#.###.###.#.###.#.#.###.###.#.###.#.###.#.###########.#.#########.#.###.#.###.###.#.#.#.###.#.#.#.#.###########
###.....#...#...#...#.#.....#...###...#.#...#.#.#...#...#...###...#...#.............#.#.....###...###...###...#.#.#.#.#...#.#...#...........#
#######.#####.#####.#.#####.#########.#.###.#.#.###.###.###########.#################.#.###.#################.#.#.#.#.#.###.###############.#
#.......#...#.#.....#.......###...#...#.#...#...#...#...#.....#.....#...#.......#.....#...#.#.........#.......#...#...#.....#.....###.......#
#.#######.#.#.#.###############.#.#.###.#.#######.###.###.###.#.#####.#.#.#####.#.#######.#.#.#######.#.#####################.###.###.#######
#...#.....#...#...........#.....#...###...###...#.....###...#...###...#.#.....#.#.....#...#.#.#.......#.....#####...###...###...#.#...#######
###.#.###################.#.#################.#.###########.#######.###.#####.#.#####.#.###.#.#.###########.#####.#.###.#.#####.#.#.#########
#...#.###...###.........#.#...#.....###.....#.#.#...#.....#.......#.#...###...#...#...#.#...#.#.#...#...###...#...#...#.#.....#.#.#.........#
#.###.###.#.###.#######.#.###.#.###.###.###.#.#.#.#.#.###.#######.#.#.#####.#####.#.###.#.###.#.#.#.#.#.#####.#.#####.#.#####.#.#.#########.#
#.....#...#...#...#...#...###...###...#...#.#.#.#.#.#...#.#...#...#.#.#...#.#####...#...#.#...#.#.#.#.#.#.....#...#...#.#.....#.#.###.......#
#######.#####.###v#.#.###############.###.#.#.#.#.#.###.#.#.#.#v###.#.#.#.#v#########.###.#.###.#.#.#.#.#.#######.#.###.#.#####.#.###v#######
#.......#...#...#.>.#...#...###...#...###.#.#.#.#.#.#...#...#.>.>.#.#.#.#.>.>.###...#...#.#.#...#.#.#.#.#...#...#.#...#.#...#...#...>.#...###
#.#######.#.###.#v#####.#.#.###.#.#.#####.#.#.#.#.#.#.#########v#.#.#.#.###v#.###.#.###.#.#.#.###.#.#.#.###v#.#.#.###.#.###.#.#######v#.#.###
#.........#...#...#.....#.#.###.#...###...#...#.#.#.#.#.........#...#.#...#.#...#.#.#...#.#.#...#.#.#.#.#.>.>.#.#...#.#...#...#.....#...#...#
#############.#####.#####.#.###.#######.#######.#.#.#.#.#############.###.#.###.#.#.#.###.#.###.#.#.#.#.#.#v###.###.#.###.#####.###.#######.#
#...#...#...#...#...#...#.#...#.....#...#.......#.#...#...........#...#...#...#.#.#.#.#...#.#...#.#...#...#.###...#.#.#...#...#...#.#.....#.#
#.#.#.#.#.#.###.#.###.#.#.###.#####.#.###.#######.###############.#.###.#####.#.#.#.#.#.###.#.###.#########.#####.#.#.#.###.#.###.#.#.###.#.#
#.#...#...#.....#...#.#.#.#...#...#.#...#...#...#.#...............#...#...###.#...#...#...#.#.....#...#...#.#...#.#.#...#...#.....#.#...#.#.#
#.#################.#.#.#.#.###.#.#v###.###.#.#.#.#.#################.###.###.###########.#.#######.#.#.#.#.#.#.#.#.#####.#########.###.#.#.#
#.......#.....#...#.#.#...#...#.#.>.>.#...#.#.#...#.#.............#...#...#...#...###...#.#.#.....#.#.#.#.#...#.#.#...#...#.......#...#.#.#.#
#######.#.###.#.#.#.#.#######.#.###v#.###.#.#.#####.#.###########.#.###.###.###.#.###.#.#.#.#.###.#.#.#.#.#####.#.###.#.###.#####.###.#.#.#.#
#.......#.#...#.#.#...#...###.#.#...#...#.#...#.....#.#...........#.#...###.....#.....#.#...#...#...#...#...#...#...#.#.....#.....###...#...#
#.#######.#.###.#.#####.#.###.#.#.#####.#.#####.#####.#.###########.#.#################.#######.###########.#.#####.#.#######.###############
#.#...#...#.....#...#...#...#...#.....#.#.....#.......#.....#.....#...###...#.........#.....###...........#...#...#...###...#...###.........#
#.#.#.#.###########.#.#####.#########.#.#####.#############.#.###.#######.#.#.#######.#####.#############.#####.#.#######.#.###.###.#######.#
#.#.#.#.#...........#.#.....###.......#...#...#...#.........#.#...###.....#...#...###.......#.............#...#.#.###.....#...#.....#...#...#
#.#.#.#.#.###########.#.#######.#########.#.###.#.#.#########.#.#####.#########.#.###########.#############.#.#.#.###.#######.#######.#.#.###
#...#...#.............#...#...#.#.....###...#...#.#...........#.....#.#.........#.......#.....#.....#.......#...#...#...#...#.........#...###
#########################.#.#.#.#.###.#######.###.#################.#.#.###############.#.#####.###.#.#############.###.#.#.#################
#.........#.....#...#...#...#.#.#.#...#...#...#...#.................#...#...#...........#.......###...###.......#...###...#.........#...#...#
#.#######.#.###.#.#.#.#.#####.#.#.#.###.#.#.###.###.#####################.#.#.###########################.#####.#.#################.#.#.#.#.#
#.......#.#...#...#...#.#...#.#...#.....#...#...###.................###...#...#...#...#...###.............#...#...#...#...........#...#...#.#
#######.#.###.#########.#.#.#.###############.#####################.###.#######.#.#.#.#.#.###.#############.#.#####.#.#.#########.#########.#
#.......#...#.........#.#.#.#...#...#.........#...#...........#...#.#...#.......#.#.#.#.#...#.....#...#...#.#.#...#.#.#.........#.#...#.....#
#.#########.#########.#.#.#.###.#.#.#.#########.#.#.#########.#.#.#.#.###.#######.#.#.#.###.#####.#.#.#.#.#.#.#.#.#.#.#########.#.#.#.#.#####
#.........#...........#...#.....#.#...###...###.#.#.........#.#.#.#.#.....###.....#.#.#.#...#...#.#.#.#.#...#.#.#.#.#...#...#...#.#.#.#.....#
#########.#######################.#######.#.###.#.#########.#.#.#.#.#########v#####.#.#.#.###.#.#.#.#.#.#####.#.#.#.###.#.#.#.###.#.#.#####.#
#...#...#...............#.........#.......#...#.#.#...#.....#...#...#.......>.>.#...#...#...#.#.#...#...#.....#.#.#.#...#.#.#...#...#.......#
#.#.#.#.###############.#.#########.#########.#.#.#.#.#.#############.#########.#.#########.#.#.#########.#####.#.#.#.###.#.###v#############
#.#...#.................#...........#...#.....#.#...#.#.......#...#...#.....#...#...#.......#.#...#...#...#...#.#...#.#...#...>.###...#...###
#.###################################.#.#.#####.#####.#######.#.#.#.###.###.#.#####.#.#######.###.#.#.#.###.#.#.#####.#.#######v###.#.#.#.###
#.#...#.....#...###.....#...#...#.....#.#...###.#...#.#...#...#.#.#.....#...#...#...#...#...#.#...#.#.#...#.#.#...#...#.###...#.###.#.#.#.###
#.#.#.#.###.#.#.###.###.#.#.#.#.#.#####.###.###.#.#.#.#.#.#.###.#.#######.#####.#.#####.#.#.#.#.###.#.###v#.#.###.#.###.###.#.#.###.#.#.#.###
#...#...###.#.#...#.#...#.#.#.#.#.....#...#.#...#.#...#.#.#.#...#.###...#.....#.#.#####.#.#.#.#...#.#.#.>.>.#.#...#...#.#...#...#...#.#.#.###
###########.#.###.#.#.###.#.#.#.#####.###.#.#.###.#####.#.#.#.###.###.#.#####.#.#.#####.#.#.#.###.#.#.#.#####.#.#####.#.#.#######.###.#.#.###
#...........#...#...#.....#.#.#.#.....###...#...#.#...#.#.#.#...#.#...#.#...#.#...#.....#.#.#...#.#.#.#.....#.#.....#...#...#...#...#.#.#...#
#.#############.###########.#.#.#.#############.#.#.#.#.#.#v###.#.#.###.#.#.#.#####.#####.#.###.#.#.#.#####.#.#####.#######.#.#.###.#.#.###.#
#.#...#.....#...###.........#.#.#.....#...#...#.#.#.#...#.>.>.#.#.#.###.#.#.#.....#.....#.#...#.#.#.#.#...#.#.......#.......#.#...#.#.#...#.#
#.#.#.#.###.#.#####.#########.#.#####v#.#.#.#.#.#.#.#########.#.#.#.###.#.#.#####.#####.#.###.#.#.#.#.#.#.#.#########.#######.###.#.#.###.#.#
#.#.#.#.#...#.#.....#...#...#.#.#...>.>.#.#.#.#.#.#.......#...#.#.#.#...#.#.#...#...#...#...#.#.#.#.#.#.#.#.......#...#...#...#...#.#...#.#.#
#.#.#.#.#.###.#.#####.#.#.#.#.#.#.#######.#.#.#.#.#######.#.###.#.#.#.###.#.#.#.###.#.#####.#.#.#.#.#.#.#.#######.#.###.#.#.###.###.###.#.#.#
#...#...#.....#.......#...#...#...#######...#...#.........#.....#...#.....#...#.....#.......#...#...#...#.........#.....#...###.....###...#.#
###########################################################################################################################################.#`;

