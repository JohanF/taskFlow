Meteor.methods({
	createTaskOrder: function(pid, theTask, beforeTaskBefore, afterTaskBefore, beforeTaskAfter, afterTaskAfter) {
		TaskOrder.insert({
			project: pid,
			tta: theTask,
			btb: beforeTaskBefore,
			atb: afterTaskBefore,
			bta: beforeTaskAfter,
			ata: afterTaskAfter
 		});
	},
	updateTaskOrder: function(pid, theTask, beforeTaskBefore, afterTaskBefore, beforeTaskAfter, afterTaskAfter) {
		TaskOrder.update({project: pid},
			{$set: {tta: theTask,
			btb: beforeTaskBefore,
			atb: afterTaskBefore,
			bta: beforeTaskAfter,
			ata: afterTaskAfter}}
 		);
	}
});
