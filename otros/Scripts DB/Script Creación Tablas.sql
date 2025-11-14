DROP TABLE IF EXISTS Votes;
DROP TABLE IF EXISTS CommentVotes;
DROP TABLE IF EXISTS ReviewVotes;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS TeacherRating;
DROP TABLE IF EXISTS eduTea;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS TeacherPage;
DROP TABLE IF EXISTS EducationalInstitution;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  userid BIGSERIAL PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  role INT NOT NULL,
  correo VARCHAR(255),
  rut VARCHAR(12),
  region VARCHAR(100),
  district VARCHAR(100),
  isMember BOOLEAN NOT NULL,
  profilePicture BYTEA
);

CREATE TABLE Post (
  postId BIGSERIAL PRIMARY KEY,
  userid BIGINT NOT NULL,
  title VARCHAR(120) NOT NULL,
  content VARCHAR(2000) NOT NULL,
  date DATE NOT NULL,
  likes INT NOT NULL,
  dislikes INT NOT NULL,
  FOREIGN KEY (userid) REFERENCES Users(userid)
);

CREATE TABLE TeacherPage (
  teacherPageId BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  content VARCHAR(500) NOT NULL,
  profilePicture BYTEA
);

CREATE TABLE EducationalInstitution (
  eduId BIGSERIAL PRIMARY KEY,
  eduName VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);

CREATE TABLE eduTea (
  eduId BIGINT NOT NULL,
  teacherPageId BIGINT NOT NULL,
  PRIMARY KEY (eduId, teacherPageId),
  FOREIGN KEY (eduId) REFERENCES EducationalInstitution(eduId),
  FOREIGN KEY (teacherPageId) REFERENCES TeacherPage(teacherPageId)
);

CREATE TABLE TeacherRating (
  ratingId BIGSERIAL PRIMARY KEY,
  teachingPoliteness REAL NOT NULL,
  teachingQuality REAL NOT NULL,
  teachingDifficulty REAL NOT NULL,
  userid BIGINT NOT NULL,
  teacherPageId BIGINT NOT NULL,
  FOREIGN KEY (userid) REFERENCES Users(userid),
  FOREIGN KEY (teacherPageId) REFERENCES TeacherPage(teacherPageId)
);

CREATE TABLE Review (
  reviewId BIGSERIAL NOT NULL,
  date DATE NOT NULL,
  dislikes INT NOT NULL,
  likes INT NOT NULL,
  content VARCHAR(500) NOT NULL,
  teacherPageId BIGINT NOT NULL,
  userid BIGINT NOT NULL,
  PRIMARY KEY (reviewId),
  FOREIGN KEY (teacherPageId) REFERENCES TeacherPage(teacherPageId),
  FOREIGN KEY (userid) REFERENCES Users(userid)
);

CREATE TABLE Comment (
  commentId BIGSERIAL NOT NULL,
  likes INT NOT NULL,
  content VARCHAR(500) NOT NULL,
  dislikes INT NOT NULL,
  date DATE NOT NULL,
  userid BIGSERIAL NOT NULL,
  postId BIGSERIAL NOT NULL,
  PRIMARY KEY (commentId),
  FOREIGN KEY (userid) REFERENCES Users(userid),
  FOREIGN KEY (postId) REFERENCES Post(postId)
);

CREATE TABLE Votes (
  voteid BIGSERIAL PRIMARY KEY,
  postid BIGINT NOT NULL,
  userid BIGINT NOT NULL,
  vote_type VARCHAR(10) CHECK (vote_type IN ('like', 'dislike')),
  FOREIGN KEY (postid) REFERENCES Post(postid),
  FOREIGN KEY (userid) REFERENCES Users(userid),
  UNIQUE (postid, userid)
);

CREATE TABLE CommentVotes (
  voteid BIGSERIAL PRIMARY KEY,
  commentid BIGINT NOT NULL,
  userid BIGINT NOT NULL,
  vote_type VARCHAR(10) CHECK (vote_type IN ('like', 'dislike')),
  FOREIGN KEY (commentid) REFERENCES Comment(commentid),
  FOREIGN KEY (userid) REFERENCES Users(userid),
  UNIQUE (commentid, userid)
);

CREATE TABLE ReviewVotes (
  voteid BIGSERIAL PRIMARY KEY,
  reviewid BIGINT NOT NULL,
  userid BIGINT NOT NULL,
  vote_type VARCHAR(10) CHECK (vote_type IN ('like', 'dislike')),
  FOREIGN KEY (reviewid) REFERENCES Review(reviewid),
  FOREIGN KEY (userid) REFERENCES Users(userid),
  UNIQUE (reviewid, userid)
);