export const PLAN_SETTINGS = {
    free: {
        maxBranches: 1,
        maxUsers: 50,
    },
    basic: {
        maxBranches: 1,
        maxUsers: 250,
    },
    premium: {
        maxBranches: 2,
        maxUsers: 500,
    },
    elite: {
        maxBranches: 2,
        maxUsers: 500,
    }
}

Object.freeze(PLAN_SETTINGS);