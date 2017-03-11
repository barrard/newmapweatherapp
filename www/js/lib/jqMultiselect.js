var multiSelect = {
	addMultiSelectListener:function(div){
		console.log(div)
		self=this
		//div is goign to get hove and click listeners
		div
		.off('click',this.toggleSelectTypes, false)
		$(div).on('click', $('body'), this.toggleSelectTypes)
		// $(div).on('mouseover').css('background-image','url(css/lib/images/dropdown.blue.hover.png)')
	},
	toggleSelectTypes: function(){
			$('.multiSelectOptions').css('visibility', 'visible')
			console.log('1')
		},
	addLabelListeners:function(){
		self=this
		$('.typeLabel')
			.off('click',  this.labelClickHandlers)			
			.on('click',  this.labelClickHandlers)			
	},
	labelClickHandlers:function(){
		console.log('Label clicked')
		console.log()
	}
}

