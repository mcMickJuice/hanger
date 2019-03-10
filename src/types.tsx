export enum Persuasion {
	Italian = 'Italian',
	Asian = 'Asian',
	Comfort = 'Comfort',
	TexMex = 'TexMex',
	Indian = 'Indian'
}

export enum Health {
	Everyday = 'Everyday',
	Splurge = 'Splurge',
	Healthy = 'Healthy'
}

export enum Protein {
	Pork = 'Pork',
	Chicken = 'Chicken',
	Vegetarian = 'Vegetarian',
	Flexible = 'Flexible',
	Beef = 'Beef'
}

export interface Meal {
	id: string
	mealName: string
	persuasion: Persuasion
	protein: Protein
	health: Health
}

export interface MealPlan {
	id: string
	mealIds: string[]
}
