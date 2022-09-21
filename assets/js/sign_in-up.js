import {$, $$} from "./constants.js"

const signInBtn = $("#sign-in")
const signUpBtn = $("#sign-up")
const signInBlock = $(".modal-sign_in")
const signUpBlock = $(".modal-sign_up")
const closeSignInModal = $(".close-modal-sign_in")
const closeSignUpModal = $(".close-modal-sign_up")
const signInContainer = $(".sign_in-modal")
const signUpContainer = $(".sign_up-modal")
const alreadyLogin = $(".acc")
const notLogin = $(".non-acc")
const SignUpBtnInSignUpModal = $(".btn-signup")
const SignInBtnInSignInModal = $(".btn-signin")


const usersAPI = 'http://localhost:3000/users'

function getServerList(callback) {
    fetch (usersAPI)
        .then((response) => {
            return response.json()
        })
        .then(callback);
        //! thằng then thứ 2 sẽ có dạng .then((server) => {console.log("server:",server)}) nhưng do truyền callback nên đối số của callback đó sẽ nhận giá trị của server và được như bên dưới
}
function createUser (data, callback) {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(usersAPI, option)
        .then((response) =>  {
            response.json()
        })
        .then(callback)
}
// function  handleCreateUser() {
//     SignUpBtnInSignUpModal.onclick = () => {
//         const userData = {
//             email : $('input[name="email"]').value,
//             username : $('input[name="username"]').value,
//             fullname : $('input[name="fullname"]').value,
//             password : $('input[name="password"]').value,
//             avatarSrc : $('input[name="avatarSrc"]').value,
//         }
//         createUser(userData, () => {
//             getServerList(renderServerList)
//         });
//     }
//     SignInBtnInSignInModal.onclick = () => {

//     }
// }
//? ở dưới server sẽ nhận giá trị của server trong json
//todo print username and avatar
function renderServerList(users) {
    const htmls = users.map((user) => {
        if (user.avatarSrc === "") {
            return `
                <h5>${user.username}</h5>
            `
        }else {
            return `
                <img src="${user.avatarSrc}" alt="" class="avatar-user">
                <h5>${user.username}</h5>
            `
        }
    })
    alreadyLogin.innerHTML = htmls.join("")
}

const click = {
    handleCreateUser() {
        SignUpBtnInSignUpModal.onclick = () => {
            const userData = {
                email : $('input[name="email"]').value,
                username : $('input[name="username"]').value,
                fullname : $('input[name="fullname"]').value,
                password : $('input[name="password"]').value,
                avatarSrc : $('input[name="avatarSrc"]').value,
            }
            createUser(userData, () => {
                getServerList(renderServerList)
            });
        }
        SignInBtnInSignInModal.onclick = () => {
    
        }
    },
    //* click to open 
    showObj(obj, objAction) {
        obj.onclick = () => {
            objAction.classList.remove("hidden")
        }
    },
    //* click to close
    closeObj(obj, objAction) {
        obj.onclick = () => {
            objAction.classList.add("hidden")
        }
    },
    //* stopPropagation
    stopPropagation(obj) {
        obj.onclick = (e) => {
            e.stopPropagation()
        }
    },
    //* click sign in or sign up button in modal => hidden .non-acc and show .acc,
    hiddenOBJ(obj, hiddenObj1, showObj, hiddenObj2) {
        obj.onclick = (e) => {
            hiddenObj1.classList.add("hidden")
            showObj.classList.remove("hidden")
            //? hidden signInBlock or signUpBlock
            hiddenObj2.classList.add("hidden")
        }
    }
    ,start() {
        this.showObj(signInBtn, signInBlock)
        this.showObj(signUpBtn, signUpBlock)
        this.closeObj(closeSignInModal, signInBlock)
        this.closeObj(closeSignUpModal, signUpBlock)
        this.closeObj(signInBlock, signInBlock)
        this.closeObj(signUpBlock, signUpBlock)
        this.stopPropagation(signInContainer)
        this.stopPropagation(signUpContainer)
        // this.hiddenOBJ(SignUpBtnInSignUpModal,notLogin,alreadyLogin,signUpBlock)
        this.hiddenOBJ(SignInBtnInSignInModal,notLogin,alreadyLogin,signInBlock)
        // getServerList(renderServerList)
        handleCreateUser()

    }
}
click.start()
