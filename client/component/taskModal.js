Template.taskModal.events({
    'click #closeTaskModal': function () {
       //close modal
        $("#taskModal").hide();
    },
    'click #createGameName': function () {
        var pName = $('#newProjectName').val();
        var pDesc = $('#newProjectDescription').val();
        console.log("pName: "+ pName+ " pDesc: "+ pDesc);
        $("#taskModal").hide();    },
});