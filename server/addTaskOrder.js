Meteor.methods({
	createTaskOrder: function(pid, beforeTaskBefore, afterTaskBefore, beforeTaskAfter, afterTaskAfter) {
		TaskOrder.insert({
			project: pid,
			btb: beforeTaskBefore,
			atb: afterTaskBefore,
			bta: beforeTaskAfter,
			ata: afterTaskAfter
 		});
	},
	updateTaskOrder: function(pid, beforeTaskBefore, afterTaskBefore, beforeTaskAfter, afterTaskAfter) {
		TaskOrder.update({project: pid},
			{$set: {btb: beforeTaskBefore,
			atb: afterTaskBefore,
			bta: beforeTaskAfter,
			ata: afterTaskAfter}}
 		);
	}
});
