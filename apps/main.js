// item (card) yaratish =============================================
const box = document.querySelector('.main__content-box');
function createCard(titleARG, imgARG, descriptionARG, timeARG) {
  const item = document.createElement('div');
  item.classList.add('item');

  const left = document.createElement('div');
  left.classList.add('item__left');

  const imageBox = document.createElement('div');
  imageBox.classList.add('item__left-image');

  const img = document.createElement('img');
  img.classList.add('item__left-img');
  img.setAttribute('src', `${imgARG}`)

  const category = document.createElement('div');
  category.classList.add('item__left-category');

  const icon1 = document.createElement('img');
  icon1.classList.add('item__left-icon', 'like');
  icon1.setAttribute('src', '../images/like.svg');

  const icon2 = document.createElement('img');
  icon2.classList.add('item__left-icon', 'dislike');
  icon2.setAttribute('src', '../images/dislike.svg');

  const right = document.createElement('div');
  right.classList.add('item__right');

  const title = document.createElement('h2');
  title.classList.add('item__right-title');
  title.textContent = titleARG;

  const text = document.createElement('p');
  text.classList.add('item__right-text');
  text.textContent = descriptionARG;

  const date = document.createElement('p');
  date.classList.add('item__right-date');
  date.textContent = timeARG;

  const hover = document.createElement('div');
  hover.classList.add('item__hover');

  const trash = document.createElement('img');
  trash.classList.add('item__hover-icon', 'cardTrash');
  trash.setAttribute('src', '../images/trash.svg');

  const cardRedact = document.createElement('img');
  cardRedact.classList.add('item__hover-icon', 'cardRedact');
  cardRedact.setAttribute('src', '../images/edit.svg');

  const plus = document.createElement('img');
  plus.classList.add('item__hover-icon', 'cardPlus');
  plus.setAttribute('src', '../images/plus.svg');

  imageBox.append(img);
  category.append(icon1);
  category.append(icon2);
  left.append(imageBox);
  left.append(category);

  right.append(title);
  right.append(text);
  right.append(date);

  hover.append(trash);
  hover.append(cardRedact);
  hover.append(plus);

  item.append(left);
  item.append(right);
  item.append(hover);

  box.append(item);
};

// local storagedan ma'lumot olish
const usersArr = JSON.parse(localStorage.getItem('users'))
const visited = localStorage.getItem('visited');

// userni ismini chiqarish ==========================================
const userNickName = document.querySelector('.header__nav-name');

let userNickNameObj = usersArr.filter(item => item.login === visited);
userNickName.textContent = userNickNameObj[0].name

// chiqib ketish ====================================================
const logout = document.querySelector('.header__nav-exit');
logout.addEventListener('click', () => {
  localStorage.removeItem('visited');
  location.href = '../index.html';
})

// accountni o'chirib tashlash
const deleteBtn = document.querySelector('.header__nav-delete');

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let LSArray = JSON.parse(localStorage.getItem('users'));
  let newArr = LSArray.filter(item => item.login !== visited);
  localStorage.setItem('users', JSON.stringify(newArr));
  localStorage.removeItem('visited');
  location.href = '../index.html';
})
// card yaratish =====================================================
const createTheme = document.querySelector('.sidebar__content-btn');
const createPopup = document.querySelector('.create');
const createPopupClose = document.querySelector('.create__nav-btn');
const createPopupCancel = document.querySelector('.create__content-cancelBtn');
const addThemeBtn = document.querySelector('.create__content-createBtn');
const createTitle = document.querySelector('.createTitle');
const createImg = document.querySelector('.createImg');
const createDescription = document.querySelector('.createDescription');

createTheme.addEventListener('click', () => {
  createPopup.style.display = 'block';
});

createPopupClose.addEventListener('click', () => {
  createPopup.style.display = 'none';
});

createPopupCancel.addEventListener('click', () => {
  createPopup.style.display = 'none';
});

addThemeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const LSArray = JSON.parse(localStorage.getItem('users'));
  let now = new Date;
  let newArr;
  let usersArr = [];

  LSArray.forEach(item => {
    if (item.login === visited) {
      newArr = item;
    } else {
      usersArr.push(item)
    }
  })

  let titleAdd = createTitle.value;
  let imgAdd = createImg.value;
  let descriptionAdd = createDescription.value;
  let time = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}  ${now.getHours()}:${now.getMinutes()}`

  if (titleAdd && imgAdd && descriptionAdd) {
    let obj = {
      title: titleAdd,
      img: imgAdd,
      description: descriptionAdd,
      time: time
    }

    newArr.data.push(obj)
    usersArr.push(newArr);
    localStorage.setItem('users', JSON.stringify(usersArr))

    createByLS()

    createPopup.style.display = 'none';
    createTitle.value = '';
    createImg.value = '';
    createDescription.value = '';
  } else {
    alert(`Ma'lumotlarni to'liq kiriting`)
  }
})

function createByLS() {
  const LSArray = JSON.parse(localStorage.getItem('users'));
  let newArr;
  LSArray.forEach(item => {
    if (item.login === visited) {
      newArr = item;
    }
  })

  box.innerHTML = '';

  newArr.data.forEach(item => {
    let title = item.title;
    let img = item.img;
    let description = item.description;
    let time = item.time;

    createCard(title, img, description, time)
  })
}

createByLS()

// cardni tahrirlash ====================================================
const editPopup = document.querySelector('.edit');
const editPopupClose = document.querySelector('.edit__nav-btn');
const editCancel = document.querySelector('.edit__content-cancelBtn');
const editBtn = document.querySelector('.edit__content-createBtn');

// view popupni yopish
const viewCloseBtn = document.querySelector('.view__nav-btn');
const viewPopup = document.querySelector('.view');

viewCloseBtn.addEventListener('click', (e) => {
  viewPopup.style.display = 'none'
})

// edit popup ochilishi
let editTitleText = '';
let editImgText = '';
let editDescriptionText = '';

box.addEventListener('click', (e) => {
  if (e.target.classList.contains('cardRedact')) {
    editPopup.style.display = 'block';

    let itemCard = e.target.parentElement.parentElement;
    let titleCard = itemCard.querySelector('.item__right-title').textContent;
    let imgCard = itemCard.querySelector('.item__left-img').getAttribute('src');
    let descriptionCard = itemCard.querySelector('.item__right-text').textContent;

    const editTitle = document.querySelector('.editTitle');
    const editImg = document.querySelector('.editImg');
    const editDescription = document.querySelector('.editDescription');

    editTitle.value = titleCard;
    editImg.value = imgCard;
    editDescription.value = descriptionCard;

    editTitleText = titleCard;
    editImgText = imgCard;
    editDescriptionText = descriptionCard;
  } else if (e.target.classList.contains('cardPlus')) {
    const item = e.target.parentElement.parentElement;

    const title = item.querySelector('.item__right-title').textContent;
    const img = item.querySelector('.item__left-img').getAttribute('src');
    const description = item.querySelector('.item__right-text').textContent;

    const viewTitle = document.querySelector('.view__content-title');
    const viewImg = document.querySelector('.view__content-img');
    const viewDescription = document.querySelector('.view__content-text');

    viewTitle.textContent = title;
    viewImg.setAttribute('src', img)
    viewDescription.textContent = description;

    viewPopup.style.display = 'block'
  } else if (e.target.classList.contains('cardTrash')) {
    const item = e.target.parentElement.parentElement;
    const title = item.querySelector('.item__right-title').textContent;
    const img = item.querySelector('.item__left-img').getAttribute('src');
    const description = item.querySelector('.item__right-text').textContent;


    let LocalStorageArray = JSON.parse(localStorage.getItem('users'));

    let LSObj;
    let newArr = [];

    LocalStorageArray.forEach(item => {
      if (item.login === visited) {
        LSObj = item;
      } else {
        newArr.push(item);
      }
    });

    let newArray = LSObj.data.filter(item => item.title !== title && item.img !== img && item.description !== description);

    let disliked = LSObj.disliked.filter(item => item.title !== title && item.description !== description);

    let liked = LSObj.liked.filter(item => item.title !== title && item.description !== description);

    LSObj.liked = liked;
    LSObj.disliked = disliked;
    LSObj.data = newArray;

    newArr.push(LSObj);
    localStorage.setItem('users', JSON.stringify(newArr));
    createByLS();

    // const item = e.target.parentElement.parentElement;
    // const title = item.querySelector('.item__right-title').textContent;
    // const img = item.querySelector('.item__left-img').getAttribute('src');
    // const description = item.querySelector('.item__right-text').textContent;

    // let LocalStorageArray = JSON.parse(localStorage.getItem('users'));

    // let LSObj;
    // let newArr = [];

    // LocalStorageArray.forEach(item => {
    //   if (item.login === visited) {
    //     LSObj = item
    //   } else {
    //     newArr.push(item)
    //   }
    // })

    // let newArray = LSObj.data.filter(item => item.title !== title && item.img !== img && item.description !== description);

    // let disliked = LSObj.disliked.filter(item => item.title !== title && item.description !== description);

    // let liked = LSObj.liked.filter(item => item.title !== title && item.description !== description);

    // LSObj.liked = liked;
    // LSObj.disliked = disliked;
    // LSObj.data = newArray;

    // newArr.push(LSObj);
    // localStorage.setItem('users', JSON.stringify(newArr));

    // box.innerHTML = ''
    // newArray.forEach(item => {
    //   let title = item.title;
    //   let img = item.img;
    //   let description = item.description;
    //   createCard(title, img, description);
    // })
  }
})

editPopupClose.addEventListener('click', (e) => {
  e.preventDefault()
  editPopup.style.display = 'none';
});

editCancel.addEventListener('click', (e) => {
  e.preventDefault()
  editPopup.style.display = 'none';
});

editBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let titleInp = document.querySelector('.editTitle').value;
  let imgInp = document.querySelector('.editImg').value;
  let descriptionInp = document.querySelector('.editDescription').value;

  const userLS = JSON.parse(localStorage.getItem('users'));
  let userHave;
  let userNewArr = [];
  userLS.forEach(item => {
    if (item.login === visited) {
      userHave = item;
    } else {
      userNewArr.push(item);
    };
  });

  userHave.data.forEach(item => {
    if (item.title === editTitleText && item.img === editImgText && item.description === editDescriptionText) {
      item.title = titleInp;
      item.img = imgInp;
      item.description = descriptionInp;
    };
  });

  userNewArr.push(userHave);
  localStorage.setItem('users', JSON.stringify(userNewArr));
  createByLS();
  editPopup.style.display = 'none';
});

// qidirsh tugmasi
const searchInput = document.querySelector('.header__nav-input');

searchInput.addEventListener('keyup', () => {
  let value = searchInput.value;
  let LSUsers = JSON.parse(localStorage.getItem('users'));
  let user = LSUsers.filter(item => item.login === visited)[0].data;
  let searchArr = user.filter((e) => {
    return e.title.toLowerCase().includes(value.toLowerCase());
  });
  createByArr(searchArr);
});

function createByArr(arg) {
  box.innerHTML = '';

  arg.forEach(item => {
    let title = item.title;
    let img = item.img;
    let description = item.description;
    let time = item.time;

    createCard(title, img, description, time);
  });
};

// like dislike card
box.addEventListener('click', (e) => {
  let item = e.target.parentElement.parentElement.parentElement;
  let title = item.querySelector('.item__right-title').textContent;
  let description = item.querySelector('.item__right-text').textContent;

  let LSArray = JSON.parse(localStorage.getItem('users'));

  if (e.target.classList.contains('like')) {
    LSArray.forEach(user => {
      let num = 1;

      user.liked.forEach(item => {
        if (item.title === title && item.description === description) {
          num = 0;
        };
      });

      user.disliked.forEach(item => {
        if (item.title === title && item.description === description) {
          num = 0;
        };
      });

      if (num === 1) {
        user.data.forEach(el => {
          if (el.title === title && el.description === description) {
            user.liked.push(el);
          };
        });
      };
    });
    
    localStorage.setItem('users', JSON.stringify(LSArray));
  } else if (e.target.classList.contains('dislike')) {
    LSArray.forEach(user => {
      let num = 1;

      user.liked.forEach(item => {
        if (item.title === title && item.description === description) {
          num = 0;
        };
      });

      user.disliked.forEach(item => {
        if (item.title === title && item.description === description) {
          num = 0;
        };
      });

      if (num === 1) {
        user.data.forEach(el => {
          if (el.title === title && el.description === description) {
            user.disliked.push(el);
          };
        });
      };
    });
    localStorage.setItem('users', JSON.stringify(LSArray));
  };
});

// like dislike category
const likedCards = document.querySelector('.categoryLike');
const dislikedCards = document.querySelector('.categoryDislike');
const allCards = document.querySelector('.categoryAll');

likedCards.addEventListener('click', () => {
  let LSArray = JSON.parse(localStorage.getItem('users'));
  let userObj;
  LSArray.filter(item => {
    if (item.login === visited) {
      userObj = item;
    };
  });

  createByArr(userObj.liked);
})

dislikedCards.addEventListener('click', () => {
  let LSArray = JSON.parse(localStorage.getItem('users'));
  let userObj;
  LSArray.filter(item => {
    if (item.login === visited) {
      userObj = item;
    }
  });

  createByArr(userObj.disliked);
});

allCards.addEventListener('click', () => {
  let LSArray = JSON.parse(localStorage.getItem('users'));
  let userObj;
  LSArray.filter(item => {
    if (item.login === visited) {
      userObj = item;
    };
  });

  createByArr(userObj.data);
});