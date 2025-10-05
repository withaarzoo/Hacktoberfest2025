This card component is data-driven. To modify the cards shown here, edit the `data.json` file in the same folder.

- data.json is a JSON array. Each item should be an object with at least `title` and `desc` properties.
- The visual background for each card is determined automatically by the card's position (index % 4):
  - 0 → sunrise
  - 1 → bright
  - 2 → sunset
  - 3 → night

Example `data.json`:
[
{"title": "Card 1", "desc": "Description for card 1."},
{"title": "Card 2", "desc": "Description for card 2."}
]

After editing `data.json`, reload the page to see changes. If `data.json` is missing or invalid, the component uses a default set of cards.
  
by [Vaibhav Jain](https://github.com/v-aibha-v-jain)