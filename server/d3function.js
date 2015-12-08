Meteor.methods({
	createGraph: function(pid){
		Graphs.insert({
				project: pid,
				nodes: [],
				links: []
		});
	},
	addNode: function(pid, name) {
		Graphs.update({ project: pid},{ $push: { nodes: name}});
	},
	removeNode: function (pid, id) {
			var i = 0;
			var n = findNode(pid, id);
			var links = Graphs.findOne({project: pid}).links;
			while (i < links.length) {
					if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
							var theLink = 'links.'+i;
							Graphs.update({project: pid}, {$unset : {theLink : 1 }});
							Graphs.update({project: pid}, {$pull : {theLink : null}});
					}
					else i++;
			}

			var theNode = 'links.'+findNodeIndex(pid, id);
			Graphs.update({project: pid}, {$unset : {theNode : 1 }});
			Graphs.update({project: pid}, {$pull : {theNode : null}});
	},
	removeLink: function (pid, source, target) {
		var links = Graphs.findOne({project: pid}).links;
			for (var i = 0; i < links.length; i++) {
					if (links[i].source.name == source && links[i].target.name == target) {

							var theLink = 'links.'+i;
							Graphs.update({project: pid}, {$unset : {theLink : 1 }});
							Graphs.update({project: pid}, {$pull : {theLink : null}});
							break;
					}
			}
			// console.log(graph.links);
	},
	sourceLinks: function (pid, source) {
		var links = Graphs.findOne({project: pid}).links;
		var tempArray = [];
				for (var i = 0; i < links.length; i++) {
					// , 'assignedUsers.uid': Meteor.userId()
						if (links[i].source.name == source && Tasks.find({title: links[i].target.name, project: pid}).fetch().length > 0) {
							tempArray.push(links[i]);
						}
				} // @TODO only let users switch places on their own tasks
			return tempArray;
	},
	targetLinks: function (pid, target) {
		var links = Graphs.findOne({project: pid}).links;
		var tempArray = [];
				for (var i = 0; i < links.length; i++) {
					// , 'assignedUsers.uid': Meteor.userId()
						if (links[i].target.name == target && Tasks.find({title: links[i].source.name, project:Session.get('selectedProject')}).fetch().length > 0) {
							tempArray.push(links[i]);
						}
				} // @TODO only let users switch places on their own tasks
			return tempArray;
	},
	removeallLinks: function (pid) {
		Graphs.update({project: pid}, {$pull: {links: {$exists: true}}});
  },
	removeAllNodes: function (pid) {
		Graphs.update({project: pid}, {$pull: {nodes: {$exists: true}}});
	},
	addLink: function (pid, source, target, value) {
		console.log("Source: " + source);
			console.log("Target: " + target);
				console.log("Value: " + value);
	  Graphs.update({project: pid},{ $push: { links: {"source": source, "target": target, "value": ''+value}}});
		//@TODO Add findNode
	}
});

var findNode = function (pid, id) {
		var nodes = Graphs.findOne({project: pid}).nodes;
		for (var i in nodes) {
				if (nodes[i]["name"] === id) return nodes[i];
		}
		;
};

var findNodeIndex = function (pid, id) {
		var nodes = Graphs.findOne({project: pid}).nodes;
		for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].id == id) {
						return i;
				}
		}
		;
};
