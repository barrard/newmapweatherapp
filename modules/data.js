module.exports = {
	data:{

	},

	getData:function(){
		return this.data
	},
	setData:function(newData){
		var currentData = this.getData()
		this.data = $.extend(currentData, newData)
		return this.data

	}
}