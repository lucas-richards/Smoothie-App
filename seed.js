require('dotenv').config();
require('./config/database');

const Movie = require('./models/movie');
const Performer = require('./models/performer');

const seedIngredients = [
    {
        name:'Peach',
        properties:'this is an awsome fruit',
        serving:23,
        kcal:34,
        protein:12,
        carbs:2,
        fat:4,
        image: '/images/ingredients/peach.png'
    },
    {
        name:'Banana',
        properties:'this is an awsome fruit',
        serving:23,
        kcal:34,
        protein:12,
        carbs:2,
        fat:4,
        image: '/images/ingredients/banana.png'
    },
    {
        name:'Kiwi',
        properties:'this is an awsome fruit',
        serving:23,
        kcal:34,
        protein:12,
        carbs:2,
        fat:4,
        image: '/images/ingredients/kiwi.png'
    },
    {
        name:'Strawberry',
        properties:'this is an awsome fruit',
        serving:23,
        kcal:34,
        protein:12,
        carbs:2,
        fat:4,
        image: '/images/ingredients/strawberry.png'
    },
    {
        name:'Peach',
        properties:'this is an awsome fruit',
        serving:23,
        kcal:34,
        protein:12,
        carbs:2,
        fat:4,
        image: ''
    }
] 
    