
document.addEventListener('DOMContentLoaded', function() {
	var forms, searchword = document.querySelectorAll('.js-finder-search-query');

	for (var i = 0; i < searchword.length; i++) {
		console.log(searchword[i])
		// If the current value equals the default value, clear it.
		searchword[i].addEventListener('focus', function (event) {
			if (event.target.value === Joomla.JText._('MOD_FINDER_SEARCH_VALUE')) {
				event.target.value = '';
			}
		});

		// Handle the auto suggestion
		if (Joomla.getOptions('finder-search')) {


			// If the current value is empty, set the previous value.
			searchword[i].addEventListener('keypress', function (event) {
				if (event.target.value.length > 1) {

					Joomla.request(
						{
							url:    Joomla.getOptions('finder-search').url+ '&q=' + event.target.value,
							method: 'GET',
							data:    { q: event.target.value },
							perform: true,
							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							onSuccess: function(response, xhr)
							{
								response = JSON.parse(response);
								if (Object.prototype.toString.call(response.suggestions) === '[object Array]') {
console.log(event.target)
console.log(response.suggestions);
									new Awesomplete(event.target, { list: response.suggestions });
								}
							},
							onError: function(xhr)
							{
								Joomla.renderMessages(Joomla.ajaxErrorsMessages(xhr));
							}
						}
					);
				}
			});
		}
	}

	forms = document.querySelectorAll('.js-finder-searchform');

	for (var i = 0; i < forms.length; i++) {
		forms[i].addEventListener('submit', function (e) {
			e.stopPropagation();
			var advanced = forms[i].querySelector('.js-finder-advanced');

			// Disable select boxes with no value selected.
			if (advanced.length) {
				var fields = advanced.querySelector('select');

				for (var j = 0; j < fields.length; j++) {
					if (!fields[j].value) {
						fields[j].setAttribute('disabled', 'disabled');
					}
				}
			}
		})
	}
});
