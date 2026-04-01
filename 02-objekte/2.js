const person = {
    lastName: 'Horst',
    firstName: 'Rüdiger',
    write : function (){
        // console.log('hallo '+ this.firstName + ' '+this.lastName)
        console.log(`hallo ${this.firstName} ${this.lastName}`)
    }
}

// person.lastName = 'Müller'
// person.write = function(){console.log('Ätsch')}
person.write()
