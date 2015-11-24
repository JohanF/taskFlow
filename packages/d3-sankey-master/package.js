Package.describe({
	name: 'apa:d3',
    summary: "Sankey D3 Plugin for Meteor"
});

Package.on_use(function(api, where) {
    api.use(['d3'], 'client');
    api.add_files(['sankey.js']);

    if (api.export) {
        api.export('sankey');
    }
});
