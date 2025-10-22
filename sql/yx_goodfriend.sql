/*
 Navicat Premium Data Transfer

 Source Server         : hello
 Source Server Type    : MySQL
 Source Server Version : 32336
 Source Host           : 192.168.171.128:3306
 Source Schema         : hlyx

 Target Server Type    : MySQL
 Target Server Version : 32336
 File Encoding         : 65001

 Date: 21/10/2025 18:56:46
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_goodfriend
-- ----------------------------
DROP TABLE IF EXISTS `yx_goodfriend`;
CREATE TABLE `yx_goodfriend`  (
  `userid` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `friendcount` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend0` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend1` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend2` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend3` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend4` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend5` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend6` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend7` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend8` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend9` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend10` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend11` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend12` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend13` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend14` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend15` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend16` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend17` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend18` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friend19` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `friendname0` varchar(32) NULL DEFAULT NULL,
  `friendname1` varchar(32) NULL DEFAULT NULL,
  `friendname2` varchar(32) NULL DEFAULT NULL,
  `friendname3` varchar(32) NULL DEFAULT NULL,
  `friendname4` varchar(32) NULL DEFAULT NULL,
  `friendname5` varchar(32) NULL DEFAULT NULL,
  `friendname6` varchar(32) NULL DEFAULT NULL,
  `friendname7` varchar(32) NULL DEFAULT NULL,
  `friendname8` varchar(32) NULL DEFAULT NULL,
  `friendname9` varchar(32) NULL DEFAULT NULL,
  `friendname10` varchar(32) NULL DEFAULT NULL,
  `friendname11` varchar(32) NULL DEFAULT NULL,
  `friendname12` varchar(32) NULL DEFAULT NULL,
  `friendname13` varchar(32) NULL DEFAULT NULL,
  `friendname14` varchar(32) NULL DEFAULT NULL,
  `friendname15` varchar(32) NULL DEFAULT NULL,
  `friendname16` varchar(32) NULL DEFAULT NULL,
  `friendname17` varchar(32) NULL DEFAULT NULL,
  `friendname18` varchar(32) NULL DEFAULT NULL,
  `friendname19` varchar(32) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE = MyISAM ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yx_goodfriend
-- ----------------------------
INSERT INTO `yx_goodfriend` VALUES (0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

SET FOREIGN_KEY_CHECKS = 1;
