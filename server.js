const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 3001;

const arr = [];

app.get("/", (req, res) => {
	res.json("Welcome");
});

app.get("/fighters", (req, res) => {
	axios
		.get("https://www.ufc.com/athletes/all")
		.then((response) => {
			const html = response.data;

			const $ = cheerio.load(html);

			$(".c-listing-athlete__name", html).each(function () {
				console.log("$(this).length: ", $(this).length);
				const test = $(this).text();
				const splitter = test.split("\n");
				const cleanName = splitter[1].trim();

				if (arr.indexOf(cleanName) === -1) {
					arr.push(cleanName);
				}
			});
			res.json(arr);
		})
		.catch((err) => console.log(err));
});

app.listen(PORT, () => {
	console.log(`http://localhost:3001/`);
	console.log(`🌎🌍🌏 You are now listening on ${PORT} 🌎🌍🌏 `);
});
