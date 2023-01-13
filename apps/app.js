// pagelar almashish tugmalari
const signup = document.querySelector('.signup');
const logPage = document.querySelector('.logPage');
const haveLog = document.querySelector('.haveLog');

const login = document.querySelector('.login');
const regPage = document.querySelector('.regPage');
const notReg = document.querySelector('.notReg');

function loginPage() {
  signup.style.transform = 'translateX(100%)';
  login.style.transform = 'translateX(0)';
};

function signupPage() {
  signup.style.transform = 'translateX(0)';
  login.style.transform = 'translateX(100%)';
};

logPage.addEventListener('click', (e) => {
  e.preventDefault();
  loginPage();
});
haveLog.addEventListener('click', (e) => {
  e.preventDefault();
  loginPage();
});
regPage.addEventListener('click', (e) => {
  e.preventDefault();
  signupPage();
});
notReg.addEventListener('click', (e) => {
  e.preventDefault();
  signupPage();
});

// sayt ochilishi bilan LSdan item olish
let usersArr = JSON.parse(localStorage.getItem('users'));
if (!usersArr) { usersArr = [] };

// ro'yxatdan o'tish
const signupBtn = document.querySelector('.signBtn');
const regNick = document.querySelector('.nickName');
const regName = document.querySelector('.userName');
const regLogin = document.querySelector('.newLogin');
const regPassword = document.querySelector('.newPassword');

signupBtn.addEventListener('click', (e) => {
  let nick = regNick.value;
  let name = regName.value;
  let login = regLogin.value;
  let password = regPassword.value;
  if (nick && name && login && password) {
    let haveUser = usersArr.filter(item => item.login === login)
    if (haveUser.length === 1) {
      alert(`Bunday profil bor`)
    } else if (haveUser.length === 0) {
      let userObj = {
        nick: nick,
        name: name,
        login: login,
        password: password,
        data: [],
        liked: [],
        disliked: []
      };

      usersArr.push(userObj);
      localStorage.setItem('users', JSON.stringify(usersArr));
      localStorage.setItem('visited', login)
      location.href = "pages/main.html";
    }

    regNick.value = '';
    regName.value = '';
    regLogin.value = '';
    regPassword.value = '';
  }
})

// profilga kirish
const loginBtn = document.querySelector('.logBtn');
const logLogin = document.querySelector('.logLogin');
const logPassword = document.querySelector('.logPassword');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let login = logLogin.value;
  let password = logPassword.value;

  if (!login && !password) {
    alert(`Login yoki parol kiritlmagan`)
  } else {
    let haveUser = usersArr.filter(item => item.login === login && item.password === password)
    
    if (haveUser.length === 0) {
      alert(`Login yoki parol xato kiritilgan`)
    } else if (haveUser.length === 1) {
      localStorage.setItem('visited', login)
      location.href = "pages/main.html";
    }
  }

  logLogin.value = '';
  logPassword.value = '';
})
