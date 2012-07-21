steal('can/control', 'can/model/list', 'can/view/ejs', './bootstrap-cyborg.css', './style.css')
.then(function() {
	var Commander = can.Model({
		findAll : 'GET /api/commanders',
		findOne : 'GET /api/commanders/{id}',
		create  : 'POST /api/commanders',
		update  : 'PUT /api/commanders/{id}',
		destroy : 'DELETE /api/commanders/{id}'
	}, {});

	var Main = can.Control({
		init: function(el, ops) {
			var self = this;

			can.view('main.ejs', {
				commanders: Commander.findAll()
			}).then(function(frag) {
				self.element.html(frag);
			});
		},

		'.up click': function(el, ev) {
			var commander = el.closest('tr').model();
			commander.attr('upvotes', commander.attr('upvotes') + 1);
			commander.save();
		},

		'.down click': function(el, ev) {
			var commander = el.closest('tr').model();
			commander.attr('downvotes', commander.attr('downvotes') + 1);
			commander.save();
		}
	});

	new Main('#main');
});
