// primitive types
let numero: number
numero = 2.4 // it could be a integer

let user: string
user = 'teste'

let teste: boolean
teste = true


// dois tipos de declaração de um array
let numbers: number[]
numbers = [1,2,3,4,5]

let otherWay: Array<number>
otherWay = [1,2,3,4,5]

// functions types

// explicit (: string)
function showMessages(message: string) : string
{
    return message
}

// implicit
function showMessages1(message: string)
{
    return message
}

// UNION -> |
function showUserId(id: number | string)
{
    return id
}
showUserId(1) // it can be number or string -> 1 or '1'

// GENERICS
function useState<T extends number | string = string>() {
    let state: T

    function get(){
        return state
    }

    function set(param: T) {
        state = param
    }

    return { get, set }
}

let state = useState<number>()
state.set(3)
console.log(state.get())

// TYPE
type CustomType = number | string

let valor: CustomType
let valor1: CustomType

valor = 'meu valor string'
valor1 = 2

// TYPE Assertions => "as"
type ResponseApi = {
    id: number,
    name: string,
    avatar: string
}
let myResponse = {} as ResponseApi

// TYPE Object
type User = {
    id: number,
    name: string,
    avatar: string
}
let myUser: User

// TYPE Optional => "?" before ":"
type UserOptionValue = {
    id: number,
    name: string,
    avatar?: string
}
let myUser1: UserOptionValue
myUser1 = {
    id: 1,
    name: 'thiago',
    // avatar: 'image.jpg'
}

// TYPE INTERSECTION => "&"
type Type1 = {}
type Type2 = {}
type Type12 = Type1 & Type2 & {}

// interface

interface IUser {
    id: number
    name: string
}

type TUser = {
    idType: number
    nameType: string
}

// Intersection between type and interface
type IntersectionTUserIUser = IUser & TUser
interface IntersectionTUserIUser2 extends IUser, TUser {}

let myCustomVariable: IntersectionTUserIUser2

