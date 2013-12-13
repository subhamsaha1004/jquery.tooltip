(function(window, $, undefined) {
	var Tooltip = function(el, settings) {
		this.$el = $(el);
		this.el = el;
		this.settings = settings;
		this.tooltipTemplate = '<div class="customTooltip {{position}}"><span class="{{position}}arrow arrow"></span><span class="toolText">{{toolText}}</span></div>';
	};

	Tooltip.prototype.create = function(target) {
		var template = this.tooltipTemplate, // clone the template
				data = {},
				html = "";

		// collect the data
		data.toolText = $(target).attr('data-tooltip');
		data.position = this.settings.position;

		// compile the template to generate the html
		html = this.compile(template, data);

		// set necessary styles
		$(target).css('position', 'relative');
		$html = $(html);
		$html.css(this.settings.css);
		$html.find('.arrow').css("border-" + this.settings.position + "-color", this.settings.css.background);

		// Append to the dom
		$(target).append($html);
		setTimeout(function() {
			$html.css({
				"opacity": 1
			});
		}, 25);
	};

	Tooltip.prototype.destroy = function() {
		// remove from the dom
		this.$el.find('.customTooltip').remove();
	};

	Tooltip.prototype.compile = function(template, data) {
		// simple find and replace
		template = template.replace(/\{\{position\}\}/g, data.position).replace(/\{\{toolText\}\}/g, data.toolText);
		return template;
	};

	// adding the plugin method to the prototype
	$.fn.tooltip = function(options) {
		// extend the default with the user provided options to create a new settings object
		var settings = $.extend({}, $.fn.tooltip.defaults, options);

		return this.each(function() {
			var el = this, // saving a reference to the element
					tooltip = new Tooltip(el, settings); // creating a tooltip object

			// Attach the listeners
			$(el).on('mouseover', function(e) {
				if(settings.target) {
					if(settings.target == e.target.nodeName.toLowerCase()) {
						tooltip.create(e.target);
					}
				} else {
					tooltip.create(this);
				}
			});

			$(el).on('mouseout', function() {
				tooltip.destroy();
			});

		});
	};

	$.fn.tooltip.defaults = {
		position: "right",
		css: {
			"background": "#222",
			"color": "#fff",
			"position": "absolute",
			"top": 0,
			"left": "270px",
			"padding": "15px",
			"min-width": "300px",
			"text-align": "center",
			"opacity": 0,
			"-webkit-transition": "all 1s ease-out"
		},
		target: null
	};

}(this, jQuery));