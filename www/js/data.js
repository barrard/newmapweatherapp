var userData = function(){

	return{
		data:{
			name:'name'
		},

		getData:function(){
			console.log('get?')
			return this.data
		},
		setData:function(newData){
			console.log('set?')
			var dataNow = this.getData()
			var combinedData = $.extend(dataNow, newData)
			this.data=combinedData;
			return this.data;

		}
	}

}()

