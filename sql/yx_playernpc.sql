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

 Date: 21/10/2025 18:58:30
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_playernpc
-- ----------------------------
DROP TABLE IF EXISTS `yx_playernpc`;
CREATE TABLE `yx_playernpc`  (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` char(15) NULL DEFAULT '未命名',
  `type` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `look` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `idmap` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `cellx` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `celly` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `jobtrinum` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job0` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job1` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job2` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job3` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job4` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job5` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job6` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `job7` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `face` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `idxserver` int(4) NULL DEFAULT -1,
  `owner_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `data0` int(4) NOT NULL DEFAULT 0,
  `data1` int(4) NOT NULL DEFAULT 0,
  `data2` int(4) NOT NULL DEFAULT 0,
  `data3` int(4) NOT NULL DEFAULT 0,
  `hue0` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `saturation0` tinyint(4) NOT NULL DEFAULT 0,
  `bright0` tinyint(4) NOT NULL DEFAULT 0,
  `hue1` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `saturation1` tinyint(4) NOT NULL DEFAULT 0,
  `bright1` tinyint(4) NOT NULL DEFAULT 0,
  `hue2` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `saturation2` tinyint(4) NOT NULL DEFAULT 0,
  `bright2` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 1000001 ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of yx_playernpc
-- ----------------------------
INSERT INTO `yx_playernpc` VALUES (1000000, '系统保留ID', 0000, 0010, 100001, 0075, 0055, 0001, 999100, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0010, -1, 0000, 0, 0, 0, 0, 46, 1, 50, 31, 44, 50, 113, 44, 33);

SET FOREIGN_KEY_CHECKS = 1;
