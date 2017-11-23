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
  var picture = {
    url: getRandomNumber(1, 25),
    coatColor: getRandomNumber(15, 200),
    eyesColor: getRandomStat(COMMENTS)
  };

  pictures[i] = picture;
}
