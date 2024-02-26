# NYT-Connections-Clone
I created a clone of the daily NYT Connections game (<a href="https://www.nytimes.com/games/connections">Seen here</a>) for my partner and I's first anniversary. It plays the exact same way, and can be customized with JSON to make you own game!

# Customization
There are two files in the data folder: ```answers.json``` and ```buttons.json```. Once you've made your own four categories, insert your category names into ```answers.json```:

```javascript
const answers = `[
    {
        "id": "a1",
        "label": "Category 1",
        "group": 1 
    },
    {
        "id": "a2",
        "label": "Category 2",
        "group": 2
    },
    {
        "id": "a3",
        "label": "Category 3",
        "group": 3 
    },
    {
        "id": "a4",
        "label": "Category 4",
        "group": 4 
    }
]`;
```
Once you have four clues for each category, insert your button names into ```buttons.json```. Make sure the ```group``` of each button corresponds to its category's ```group``` in ```answers.json```:

```javascript
const buttons = `[
    {
        "id": "b1",
        "label": "Clue 1, Category 1",
        "group": 1
    },
    {
        "id": "b2",
        "label": "Clue 1, Category 1",
        "group": 1
    },
    {
        "id": "b3",
        "label": "Clue 1, Category 1",
        "group": 1
    },
    {
        "id": "b4",
        "label": "Clue 1, Category 1",
        "group": 1
    },
    {
        "id": "b5",
        "label": "Clue 1, Category 2",
        "group": 2
    },
    {
        "id": "b6",
        "label": "Clue 1, Category 2",
        "group": 2
    },
    ... // etc
]`;
```

# Built With
<ul>
 <li>HTML & CSS</li>
 <li>Vanilla Javascript</li>
 <li>JSON</li>
</ul>

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.
