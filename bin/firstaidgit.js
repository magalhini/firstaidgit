#!/usr/bin/env node

var program = require("commander");
var requestJson = require("request-json");
var chalk = require("chalk");
var fuzzy = require("fuzzy");

var q = "";
var url = "https://raw.githubusercontent.com/magalhini/firstaidgit/master/assets/posts.json";

program.version("0.0.1")
    .usage("key")
    .parse(process.argv);

if (!program.args.length) {
    program.help();
} else {
    q = program.args;
}

var client = requestJson.createClient("http://localhost:8888/");

client.get(url, function(err, res, body) {
    var options = {
        extract: function(el) {return el.title; }
    };

    if (q.length) {
        q = q.join(" ");
        var results = fuzzy.filter(q.toString(), body, options);
        var matches = results.map(function(el, i, o) {
            return el;
        });

        matches.forEach(function(el) {
            console.log('>>>> ' + chalk.magenta.bold(el.original.title));
            console.log(chalk.green(el.original.content));
        });
    }
});
