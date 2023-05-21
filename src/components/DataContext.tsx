// {'state': 'succeed', 'id': c.id, 'password': c.password, 'username': c.username, 'name': c.name,
//     'major': c.major,
//     'gender': c.gender, 'email': c.email, 'email_password': c.email_password}

let sharedPassword:string = '';
let sharedId:string = 'fail';
let sharedUsername:string = '';
let sharedName:string = '';
let sharedMajor: string = '';
let sharedGender:string='';
let sharedEmail:string='';
let sharedEmailPassword:string='';

export function setSharedId(data: string) {
    sharedId = data;
}
export function getShareId() {
    return sharedId;
}
export function setSharedUsername(data: string) {
    sharedUsername = data;
}
export function getShareUsername() {
    return sharedUsername;
}
export function setSharedName(data: string) {
    sharedName = data;
}
export function getSharedName() {
    return sharedName;
}

export function setSharedMajor(data: string) {
    sharedMajor = data;
}
export function getSharedMajor() {
    return sharedMajor;
}

export function setSharedGender(data: string) {
    sharedGender = data;
}
export function getSharedGender() {
    return sharedGender;
}

export function setSharedEmail(data: string) {
    sharedEmail = data;
}
export function getSharedEmail() {
    return sharedEmail;
}


export function setSharedPassword(data: string) {
    sharedPassword = data;
}
export function getSharedPassword() {
    return sharedPassword;
}

export function setSharedEmailPassword(data: string) {
    sharedEmailPassword = data;
}
export function getSharedEmailPassword() {
    return sharedEmailPassword;
}

