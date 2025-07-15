MVC ARch => Controlllers
>>M :Modal(it depicts the structure of mongodb collections)
>>V : View(wrt to fronted(react js))
>> C: Controllers(Branch or logical part of a route)
    >> books.controllers.js
    >>users.controllers.js

schema>>
    id :String
    name: String
    age: number
    Gender :char || varcha(15)

model>>
    id:
    name:
    age:
    gender:

Redmi note 8 pro
amazon:18K
flipkart:10k

 Foreing Key:
 >> Referential Integrity
    Users Table       Books Table    
    issuedbook:3(foreing key here)     issuedBook:2 (primary key)