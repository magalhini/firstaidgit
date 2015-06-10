#!/usr/bin/env node

var program = require('commander');
var requestJson = require('request-json');
var chalk = require('chalk');
var fuzzy = require('fuzzy');

var url = 'https://raw.githubusercontent.com/magalhini/firstaidgit/master/assets/posts.json';
var log = console.log;

program.version('0.0.1')
    .usage('your query goes here')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
} else {
    var q = program.args;
    log(chalk.white('Searching First Aid Git...'));
}

var client = requestJson.createClient('http://localhost:8888/');

client.get(url, function(err, res, body) {
    var options = {
        extract: function(el) {return el.title && el.help; }
    };

    if (q.length) {
        q = q.join(' ');

        var results = fuzzy.filter(q.toString(), body, options);
        var matches = results.map(function(el, i, o) {
            return el;
        });

        if (!matches.length) {
            log(chalk.cyan('No matches, try changing your query.'));
            return false;
        }

        log(chalk.dim(matches.length + ' results found:'));

        matches.forEach(function(el) {
            var formatted = el.original.content.replace(/`/gi, '');
            log(chalk.cyan('>>>> ') + chalk.yellow.bold(el.original.title));
            log(chalk.green(formatted) + '\n\n');
        });
    }
});
