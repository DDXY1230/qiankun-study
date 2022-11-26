(function () {
    function sayHi(str) {
        return '你好啊' + str;
    }
    var text = '小甜甜';
    console.log(sayHi(text));
    function hhhj(tex) {
        console.log(tex);
    }
    function showFullName(person) {
        return person.firstName + '_' + person.lastName;
    }
    var person = {
        firstName: '东方',
        lastName: '不败'
    };
    console.log(showFullName(person));
    // 类
    var Person = /** @class */ (function () {
        function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = this.firstName + this.lastName;
        }
        return Person;
    }());
    var person1 = new Person(person.firstName, person.lastName);
})();
