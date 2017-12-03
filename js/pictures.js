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

var pictureTemplate = document.querySelector('#picture-template').content;
var picturesList = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');

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

// Перемешиваю массив
var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * i);
    swapElements(array, i, randomIndex);
  }

  return array;
};

// Из массива предложений создаю большой массив предложений ЗАЧЕМ :\
var createCommentsArray = function (array) {
  var newArray = [];

  for (var i = 0; i < PICTURES_NUMBER; i++) {
    newArray[i] = array[getRandomNumber(0, array.length - 1)];
  }

  return newArray;
};

// Создаю массив комментов для фоток
var createComments = function () {
  var comments = [];
  var sentences = shuffleArray(createCommentsArray(SENTENCES));
  var randomLength = getRandomNumber(1, PICTURES_NUMBER);

  for (var i = 0; i < randomLength; i++) {
    var length = getRandomNumber(1, 2);

    if (length === 2) {
      var randomIndex = getRandomNumber(0, sentences.length - 1);
      comments[i] = sentences[i] + sentences[randomIndex];
    } else {
      comments[i] = sentences[i];
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

  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

  return pictureElement;
};

// Заполняю и показываю оверлей
var fillOverlay = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', picture.url);
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;

  galleryOverlay.classList.remove('hidden');
};

// Рисую фоточки
var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPicture(array[i]));
  }

  picturesList.appendChild(fragment);
};

var pictures = createPictures();
renderPictures(pictures);
fillOverlay(pictures[0]);


// Создаю массив чисел от min до max
// var createArray = function (min, max) {
//   var array = [];
//
//   for (var i = 0; i < max; i++) {
//     array[i] = i + 1;
//   }
//
//   return array;
// };
