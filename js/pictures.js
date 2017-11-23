'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomStat = function (stat) {
  return stat[getRandomNumber(0, stat.length)];
};

var pictures = [];

for (var i = 0; i < 25; i++) {
  var pictureObj = {
    url: 'photos/' + getRandomNumber(1, 25) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: getRandomStat(COMMENTS)
  };

  pictures[i] = pictureObj;
}

var pictureTemplate = document.querySelector('#picture-template');
var picturesList = document.querySelector('.pictures');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.content.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}

picturesList.appendChild(fragment);

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

var renderBigPicture = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', picture.url);
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
};

var bigPicture = renderBigPicture(pictures[0]);

galleryOverlay.appendChild(bigPicture);
