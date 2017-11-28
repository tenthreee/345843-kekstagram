'use strict';

var PICTURES_NUMBER = 25;

var COMMENTS = [
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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Создаю болванку для пикчи
var getPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;

  return pictureElement;
};

// Создаю болванку для большой пикчи
var getBigPicture = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', picture.url);
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length; // Я понимаю, что у меня в итоге получается длина строки, а не количество комментов. И я не знаю, откуда брать количество комментов. В моей нынешней реализации коммент всегда один :\
};

// Создаю массив фоточек
var createPictures = function () {
  var pictures = [];

  for (var i = 0; i < PICTURES_NUMBER; i++) {
    pictures[i] = {
      url: 'photos/' + getRandomNumber(1, 25) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: COMMENTS[getRandomNumber(0, COMMENTS.length)] // Пока не сообразила, как сделать правильно :\
    };
  }

  return pictures;
};

// Рисую фоточки
var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPicture(array[i]));
  }

  picturesList.appendChild(fragment);
};

renderPictures(createPictures());

galleryOverlay.classList.remove('hidden');
galleryOverlay.appendChild(getBigPicture(createPictures()[0])); // Тут сильно заморочено или не?
