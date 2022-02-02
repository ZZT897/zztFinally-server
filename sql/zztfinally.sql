/*
Navicat MySQL Data Transfer

Source Server         : ZZT
Source Server Version : 50730
Source Host           : localhost:3306
Source Database       : zztfinally

Target Server Type    : MYSQL
Target Server Version : 50730
File Encoding         : 65001

Date: 2022-02-02 16:39:04
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `commentlist`
-- ----------------------------
DROP TABLE IF EXISTS `commentlist`;
CREATE TABLE `commentlist` (
  `commentCardId` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of commentlist
-- ----------------------------
INSERT INTO commentlist VALUES ('3', '新用户评论测试', 'ceshi', '5');
INSERT INTO commentlist VALUES ('4', 'e', 'ceshi', '6');

-- ----------------------------
-- Table structure for `communitylist`
-- ----------------------------
DROP TABLE IF EXISTS `communitylist`;
CREATE TABLE `communitylist` (
  `title` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of communitylist
-- ----------------------------
INSERT INTO communitylist VALUES ('地区的工业总产值和GDP关系', '清册', '看到有的地区工业总产值比GDP大好几倍，这种情况怎么解释呢', '资料分享', '1');
INSERT INTO communitylist VALUES ('求地级市驻地点图SHP', '户话胡', '找到的是零几年的那一版，很多城市匹配不上。不知道有没有新版的地级市驻地点图SHP。或者求告知怎么在旧版基础上能更正，本人技术有限，盼大神回复', '问题互助', '2');
INSERT INTO communitylist VALUES ('stata回归', '白开水不加糖', '我用的是截面数据 所以下了hansen官网的指令也就是thresholdtest和thresholdreg 在回归之前我需要先确定门槛数量 不知道要怎么操作', '资料分享', '3');
INSERT INTO communitylist VALUES ('新用户发帖', 'ceshi', '新用户发帖', '资料分享', '4');

-- ----------------------------
-- Table structure for `datalist`
-- ----------------------------
DROP TABLE IF EXISTS `datalist`;
CREATE TABLE `datalist` (
  `name` varchar(255) DEFAULT NULL,
  `access` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `dataSort` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `isCheck` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of datalist
-- ----------------------------
INSERT INTO datalist VALUES ('529中国省市县灯光数据合集', '免费', '三种非辐射定标的夜间灯光影像。三种全年平均影像分别是：无云观测频数影像、平均灯光影像和稳定灯光影像。稳定灯光影像是标定夜间平均灯光强度的年度栅格影像，该影像包括城市、乡镇', '企业数据', '1', '0', '-1', '审核通过');
INSERT INTO datalist VALUES ('558 财政数据专题', '会员免费', '1）30省地方政府债务面板数据\r\n（2）地级市政府财政透明度数据\r\n（3）各地财政支出和城乡收入差距\r\n（4）各省地级市政府性债务数据', '地理数据', '2', '2', '-1', '审核通过');
INSERT INTO datalist VALUES ('30托宾Q数据', '免费', '经济', '企业数据', '3', '0', '-1', '审核通过');
INSERT INTO datalist VALUES ('61 Matlab模式分类手册和代码', '会员免费', '代码', '企业数据', '4', '4', '-1', '审核通过');
INSERT INTO datalist VALUES ('供给测试', '免费', '供给测试', '地理数据', '7', '0', '3', '审核通过');
INSERT INTO datalist VALUES ('供给测试3', '免费', '供给测试3', '学习资料', '10', '0', '3', '待审核');
INSERT INTO datalist VALUES ('供给测试2', '免费', '供给测试2', '学习资料', '11', '0', '3', '审核通过');

-- ----------------------------
-- Table structure for `frontenduser`
-- ----------------------------
DROP TABLE IF EXISTS `frontenduser`;
CREATE TABLE `frontenduser` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isVip` varchar(255) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of frontenduser
-- ----------------------------
INSERT INTO frontenduser VALUES ('zhaoteng', 'zhaoteng', '2', 'no', '2');
INSERT INTO frontenduser VALUES ('ceshi', 'ceshi', '3', 'yes', '4');
INSERT INTO frontenduser VALUES ('zzt', '123456', '4', 'yes', '0');

-- ----------------------------
-- Table structure for `needdata`
-- ----------------------------
DROP TABLE IF EXISTS `needdata`;
CREATE TABLE `needdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `hasSupply` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of needdata
-- ----------------------------
INSERT INTO needdata VALUES ('1', '测试1', '1', '测试1', '求数据', '13411534343', 'zzt', '是');
INSERT INTO needdata VALUES ('2', '发布需求测试', '3', '发布需求测试', '求数据', '13433434352', '发布需求', '否');
INSERT INTO needdata VALUES ('3', '22222222222', '3', '453', '数据爬虫', '13433452313', '111', '是');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO user VALUES ('zzt', '123456', '1');
