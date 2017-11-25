'use strict';

var PICTURES_QUANTITY = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var pictureTemplate = document.querySelector('#picture-template');
var picturesList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');
var pictures = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.content.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;

  return pictureElement;
};

for (var i = 0; i < PICTURES_QUANTITY; i++) {
  var pictureObj = {
    url: 'photos/' + getRandomNumber(1, 25) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: COMMENTS[getRandomNumber(0, COMMENTS.length)] // Я понимаю, что это не совсем верно, но не знаю пока, как сделать правильно :\
  };

  pictures[i] = pictureObj;
  fragment.appendChild(renderPicture(pictures[i]));
}

var renderBigPicture = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', picture.url);
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length; // Тут то же самое. Я понимаю, что у меня в итоге получается длина строки, а не количество комментов. И я не знаю, откуда брать количество комментов. В моей нынешней реализации коммент всегда один :\
};

picturesList.appendChild(fragment);
galleryOverlay.classList.remove('hidden');
galleryOverlay.appendChild(renderBigPicture(pictures[0]));
