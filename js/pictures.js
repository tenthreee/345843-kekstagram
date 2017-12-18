'use strict';

var PICTURES_NUMBER = 25;

var SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var template = document.querySelector('#picture-template');
var pictureTemplate = template.content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleyOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
var likesCount = galleryOverlay.querySelector('.likes-count');
var commentsCount = galleryOverlay.querySelector('.comments-count');

// Получаю случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Делаю рокировочку
var swapElements = function (array, index1, index2) {
  var temporaryValue = array[index1];
  array[index1] = array[index2];
  array[index2] = temporaryValue;
};

// Делаю копию массива
var copyArray = function (array) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    newArray[i] = array[i];
  }

  return newArray;
};

// Перемешиваю массив
var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * i);
    swapElements(array, i, randomIndex);
  }

  return array;
};

// Создаю массив комментов
var createComments = function () {
  var comments = [];
  var sentences = shuffleArray(copyArray(SENTENCES));
  var randomLength = getRandomNumber(1, PICTURES_NUMBER);

  for (var i = 0; i < randomLength; i++) {
    var length = getRandomNumber(1, 2);

    for (var j = 0; j < length; j++) {
      comments[i] += sentences[j];
    }
  }

  return comments;
};

// Создаю массив фоточек
var createPictures = function () {
  var pictures = [];

  for (var i = 0; i < PICTURES_NUMBER; i++) {
    var comments = createComments();
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: shuffleArray(comments)
    };
  }

  return shuffleArray(pictures);
};

// Создаю болванку для превьюшки
var getPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

  return pictureElement;
};

// Заполняю и показываю оверлей
var fillOverlay = function (picture) {
  galleyOverlayImage.src = picture.querySelector('img').getAttribute('src');
  likesCount.textContent = picture.querySelector('.picture-likes').textContent;
  commentsCount.textContent = picture.querySelector('.picture-comments').textContent;

  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onGalleryOverlayCloseEscKeydown);
};

// Рисую фоточки
var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var currentPicture = getPicture(array[i]);

    fragment.appendChild(currentPicture);
    currentPicture.addEventListener('click', function (evt) {
      evt.preventDefault();
      fillOverlay(evt.currentTarget);
    });
  }

  picturesList.appendChild(fragment);
};

var pictures = createPictures();
renderPictures(pictures);


// Сценарий взаимодействия пользователя с сайтом

var Keycode = {
  ESC: 27,
  ENTER: 13
};

var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

// Закрываю оверлей
var closeGalleryOverlay = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onGalleryOverlayCloseEscKeydown);
};

var onGalleryOverlayCloseEscKeydown = function (evt) {
  if (evt.keyCode === Keycode.ESC) {
    closeGalleryOverlay();
  }
};

galleryOverlayClose.addEventListener('click', function () {
  closeGalleryOverlay();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Keycode.ENTER) {
    closeGalleryOverlay();
  }
});

document.addEventListener('keydown', onGalleryOverlayCloseEscKeydown);
