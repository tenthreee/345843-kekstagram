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

// Создаю болванку для пикчи
var getPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length; // Пока так :\

  return pictureElement;
};

// Создаю болванку для большой пикчи
var getBigPicture = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', picture.url);
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length; // Ну и тут
};

// Получаю случайное количество сердечек
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Делаю рокировочку
var swapElements = function (array, index1, index2) {
  var temporaryValue = array[index1];
  array[index1] = array[index2];
  array[index2] = temporaryValue;
};

// Создаю массив чисел от min до max
var createArray = function (min, max) {
  var array = [];

  for (var i = 0; i < max; i++) {
    array[i] = i + 1;
  }

  return array;
};

// Перемешиваю массив
var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * i);
    swapElements(array, i, randomIndex);
  }

  return array;
};

var createCommentsArray = function (array) {
  var newArray = [];

  for (var i = 0; i < PICTURES_NUMBER; i++) {
    newArray[i] = array[getRandomNumber(0, array.length - 1)];
  }

  return newArray;
};

// Создаю массив комментариев ЧТО Я ДЕЛАЮ НЕ ТАК
var createComments = function () {
  var comments = [];
  var sentences = createCommentsArray(SENTENCES);

  for (var i = 0; i < PICTURES_NUMBER; i++) {
    comments[i] = sentences[i];
  }

  return comments;
};

// Создаю массив фоточек
var createPictures = function () {
  var pictures = [];
  var numbers = shuffleArray(createArray(1, 25));
  var comments = createComments();

  for (var i = 0; i < PICTURES_NUMBER; i++) {
    pictures[i] = {
      url: 'photos/' + numbers[i] + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: comments[i]
    };
  }

  return pictures;
};

// Рисую фоточки
var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();
  var bigPicture = document.createDocumentFragment(getBigPicture(array[0]));

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPicture(array[i]));
  }

  picturesList.appendChild(fragment);
  galleryOverlay.appendChild(bigPicture);
};

renderPictures(createPictures());

galleryOverlay.classList.remove('hidden');
