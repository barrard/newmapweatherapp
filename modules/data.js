var logger = require('tracer').colorConsole({
                    format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                });


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