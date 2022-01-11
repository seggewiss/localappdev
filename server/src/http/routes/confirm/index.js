function matches(req) {
    return req.url.match(/\/confirm/);
}

function handle(req, res) {
    // TODO: Save shop credentials to the database
    res.writeHead(200)
    res.end('')
}

exports.matches = matches;
exports.handle = handle;
