export const DEPARTMENTS = [
    "Engineering",
    "Product",
    "Finance",
    "Marketing",
    "Design",
    "HR",
];

export const DESIGNATIONS = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "QA Engineer",
    "Product Manager",
    "Tech Lead",
];

export const STATUSES = ["Active", "Inactive"] as const;

export const SALARY_RANGE = {
    MIN: 25000,
    MAX: 18000
} as const

export const QUANTITY_RANGE = {
    MIN: 1,
    MAX: 25
} as const

export const JOINING_DATE = {
    FROM: new Date("2020-01-01"),
    TO: new Date(),
} as const;